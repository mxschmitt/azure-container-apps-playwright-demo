# Playwright on Azure Container Apps

This example demonstrates a CI/CD configurationn to Azure Container Apps via GitHub Actions.
The container gets built and deployed to Azure Container instances on every commit to the `master` branch.
For demonstration purposes, [Playwright's Docker image](https://playwright.dev/docs/docker) is used
to launch browsers and return its screenshot to the frontend. The actual image which gets built inside GitHub Actions
gets pushed to the Azure Container Registry.

For further reference, see here:

- https://azure.microsoft.com/en-us/services/container-apps/
- https://azure.microsoft.com/en-us/services/container-registry/
- https://playwright.dev/docs/docker
