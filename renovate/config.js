module.exports = {
    "dependencyDashboard": true,
    enabledManagers: [
        // "dockerfile",
        // "helmv3",
        // "helm-values",
        "regex",
        // "pre-commit",
        "terraform",
        "terraform-version",
        // "terragrunt",
        // "terragrunt-version",
        // "gitlabci",
        // "gomod",
    ],
    regexManagers:
        [
            {
                "fileMatch": ["test.txt"],
                "matchStrings": [
                    "(.*image|.*IMAGE)[^a-zA-Z]*(?<registryUrl>.*?)\\/(?<depName>.*?):(?<currentValue>.*?)@?(?<currentDigest>sha256:[a-f0-9]+)?\\s",
                ],
                "datasourceTemplate": "docker"
            },
            {
                "fileMatch": ["test.txt"],
                "matchStrings": [
                    "(#|\\/\\/)\\s?renovate: datasource=(?<datasource>.*?) depName=(?<depName>.*?)( registry=(?<registryUrl>.*?))?( versioning=(?<versioning>.*?))?\\s.*ref=(?<currentValue>.*)\""
                ],
            },

                    // "currentValue": "5.0.0",
                    // "depType": "module",
                    // "depName"/"packageName": "terraform-aws-modules/vpc/aws",
                    // "datasource": "terraform-module",
                    // "versioning": "hashicorp",
                    // "sourceUrl": "https://github.com/terraform-aws-modules/terraform-aws-vpc",
                    // "registryUrl": "https://registry.terraform.io",
                    // "homepage": "https://registry.terraform.io/modules/terraform-aws-modules/vpc/aws",
                    // "currentVersion": "5.0.0",

//         {
            //     "fileMatch": ["test.txt"],
            //     "matchStrings": ["version=(?<currentValue>.*?) # renovate: depName=(?<depName>.*?)\\n"],
            //     "datasourceTemplate": "github-releases"
            // },
            // {
            //         "fileMatch": [".*"],
            //         "matchStrings": [
            //             "datasource=(?<datasource>.*?) depName=(?<depName>.*?)( versioning=(?<versioning>.*?))?\\sENV .*?_VERSION=(?<currentValue>.*)\\s"
            //         ],
            //         "versioningTemplate": "{{#if versioning}}{{{versioning}}}{{else}}semver{{/if}}"
            //     },
        ]

    // "regexManagers": [
    //
    //     {
    //         "fileMatch": ["^Dockerfile$"],
    //         "matchStrings": [
    //             "datasource=(?<datasource>.*?) depName=(?<depName>.*?)( versioning=(?<versioning>.*?))?\\sENV .*?_VERSION=(?<currentValue>.*)\\s"
    //         ],
    //         "versioningTemplate": "{{#if versioning}}{{{versioning}}}{{else}}semver{{/if}}"
    //     },
    //     {
    //         "regexManagers": [
    //             {
    //                 "fileMatch": ["test.txt"],
    //                 "matchStrings": ["version=(?<currentValue>.*?) # renovate: depName=(?<depName>.*?)\\n"],
    //                 "datasourceTemplate": "github-releases"
    //             }
    //         ]
    //     },
    // ]
}