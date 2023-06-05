terraform {
  required_providers {
    aws = {
      version = "~> 2.70.0"
    }
    random = {
      version = ">= 2.1.2"
    }
  }

  required_version = "~> 0.12.29"
}
