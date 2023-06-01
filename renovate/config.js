module.exports = {
    "dependencyDashboard": true,
    enabledManagers: [
        // "dockerfile",
        // "helmv3",
        // "helm-values",
        "regex",
        // "pre-commit",
        // "terraform",
        // "terraform-version",
        // "terragrunt",
        // "terragrunt-version",
        "gitlabci",
        // "gomod",
    ],
    regexManagers:
        [
            {
                "fileMatch": ["test.txt"],
                "matchStrings": ["version=(?<currentValue>.*?) # renovate: depName=(?<depName>.*?)\\n"],
                "datasourceTemplate": "github-releases"
            }
        ]


    // "regexManagers": [
    //     {
    //         "fileMatch": [".*"],
    //         "matchStrings": [
    //             "ENV NODE_VERSION=10.19.0 # github-tags/nodejs/node&versioning=node",
    //             // "(.*image|.*IMAGE)[^a-zA-Z]*(?<registryUrl>.*?)\/(?<depName>.*?):(?<currentValue>.*?)@?(?<currentDigest>sha256:[a-f0-9]+)?\"?$"
    //         ],
    //         "datasourceTemplate": "docker"
    //     },
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