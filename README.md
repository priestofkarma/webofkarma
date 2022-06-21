<h1 align="center">
  Gatsby contentful + intl starter
</h1>

## 🚀 Quick start

0.  **Create a theme site.**

 	```shell
    # Install packages (maybe gatsby-plugin-intl need install with --legacy-peer-deps)
    npm run theme
    ```

	https://www.npmjs.com/package/github-vscode-theme
	
	https://github.com/andrewbranch/gatsby-remark-vscode#using-languages-and-themes-from-an-extension

1.  **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying the minimal starter.

    ```shell
    # Install packages (maybe gatsby-plugin-intl need install with --legacy-peer-deps)
    npm install
    ```

	If Error: Something went wrong installing the "sharp" module

	```shell
    rm -rf node_modules/sharp
	npm install --arch=x64 --platform=darwin sharp
    ```

2.  **Start developing.**

	Add Space id and Access token to `.env` files

	```
		CONTENTFUL_SPACE_ID=YOUR_SPACE_ID
		CONTENTFUL_ACCESS_TOKEN=YOUR_ACCESS_TOKEN
	```

3.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    npm run develop
    ```

4.  **Open the code and start customizing!**

    Your site is now running at http://localhost:8000!

    Edit `src/pages/index.js` to see your site update in real-time!
