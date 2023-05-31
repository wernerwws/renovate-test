# versions depends on pre-commit-terraform image
terraform_version_constraint  = ">= 1.4.3"
terragrunt_version_constraint = ">= 0.45.2"

locals {
  team = element(split("/", get_repo_root()), length(split("/", get_repo_root())) - 2)

  # Automatically load and extract account-level variables
  account_vars   = read_terragrunt_config(find_in_parent_folders("_account.hcl"))
  account_name   = local.account_vars.locals.account_name
  aws_account_id = local.account_vars.locals.aws_account_id

  # Automatically load and extract stage-level variables
  stage_vars     = read_terragrunt_config(find_in_parent_folders("_stage.hcl"))
  stage          = local.stage_vars.locals.stage
  cost_reference = local.stage_vars.locals.cost_reference
}

# Configure Terragrunt to automatically store tfstate files in an S3 bucket
remote_state {
  backend = "s3"
  config = {
    encrypt        = true
    bucket         = "${local.aws_account_id}-s3-terraform-state-${lower(local.account_name)}-${lower(local.stage)}-terraform-live-s3"
    key            = "ris/magellan/infrastructure/terraform-live/${local.team}/${basename(get_parent_terragrunt_dir())}/${get_path_from_repo_root()}/terraform.tfstate"
    region         = "eu-central-1"
    dynamodb_table = "${local.aws_account_id}-s3-terraform-state-${lower(local.account_name)}-${lower(local.stage)}-terraform-live-dynamodb"
  }
  generate = {
    path      = "backend.tf"
    if_exists = "overwrite"
  }
}

generate "versions" {
  path = "versions.tf"
  # if an upstream module already sets versions, skip generation and leave the existing file as is
  if_exists = "skip"
  contents  = <<EOF
    terraform {
      required_providers {
        aws = {
          version = ">= 4.55.0"
        }
      }
    }
EOF
}

generate "provider" {
  path      = "provider.tf"
  if_exists = "overwrite"
  contents  = <<EOF
provider "aws" {
  region = "eu-central-1"
  default_tags {
    tags = {
      # https://cloud-faq.gitpages.tech.rz.db.de/allgemein/tagging.html
      CostReference   = "${local.cost_reference}"
      ReferenceID     = "SV-10353"
      ReferenceName   = "Produktionstool DBS ServiceTeam Magellan"
      Environment     = "${local.stage}"
      # https://ri-wiki.com/x/dTXaC
      Techname = "RI Plattform"
      Name     = "Produktionstool DBS ServiceTeam Magellan"
      Owner    = "magellan"
    }
  }
}
EOF
}


# ---------------------------------------------------------------------------------------------------------------------
# GLOBAL PARAMETERS
# These variables apply to all configurations in this subfolder. These are automatically merged into the child
# `terragrunt.hcl` config via the include block.
# ---------------------------------------------------------------------------------------------------------------------

# Configure root level variables that all resources can inherit. This is especially helpful with multi-account configs
# where terraform_remote_state data sources are placed directly into the modules.
inputs = merge(
local.account_vars.locals,
local.stage_vars.locals,
)
