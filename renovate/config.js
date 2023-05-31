module.exports = {
    "dependencyDashboard": true,
    enabledManagers: [
        "dockerfile",
        "helmv3",
        "helm-values",
        "regex",
        "pre-commit",
        "terraform",
        "terraform-version",
        "terragrunt",
        "terragrunt-version",
        "gitlabci",
        "gomod",
    ],
    "regexManagers": [
        {
            "fileMatch": ["^.*.gitlab-ci.yml$"],
            "matchStrings": [
                "(.*image|.*IMAGE)[^a-zA-Z]*(?<registryUrl>.*?)\/(?<depName>.*?):(?<currentValue>.*?)@?(?<currentDigest>sha256:[a-f0-9]+)?\"?$"
            ],
            "datasourceTemplate": "docker"
        }
    ]
}