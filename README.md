<h1 align="center">Source-code for our website <a href="https://momentum-fw.dev" target="_blank">momentum-fw.dev</a></h1>

### Structure:

This project is structured into two folders:

1. [Public](https://github.com/Next-Flip/Momentum-Website/tree/main/public):

    The `public` folder is what you see when visiting the website. It's the compiled files for the webupdater & asset packs, and all the other static pages.


2. [src](https://github.com/Next-Flip/Momentum-Website/tree/main/src):

    The `src` folder contains the sourcecode for the webupdater & asset pack page. This is compiled, then put into the public static assets.

### Development workflow:

The webupdater and asset-packs page use [Vue](https://github.com/vuejs/) to handle state (like handling Flipper via serial) and are integrated into the rest of the static pages.

1. Install dependencies:

    - For Fedora:
        ```console
        dnf install tzdata npm
        ```
    - For Ubuntu:
        ```console
        apt install tzdata npm
        ```
    - For alpine:
        ```console
        apk install tzdata npm
        ```

2. Build with these commands in the `frontend` directory:
    ```console
    npm i
    # If there is any vulnerabilities ALWAYS run "npm audit fix". Dont be lazy!
    quasar build -m spa
    ```

3. Finally, opy the built files over into the `public` folder. You can distinguish generated files by the random filenames. Also you'll need to copy the main index page into the frame directories. Now you can serve it with any webserver software.

### Credits:

The core backend for the webupdater and the asset packs (as in, the Vue part) is largely based on the base of [lab.flipper.net](https://github.com/flipperdevices/lab.flipper.net).

<br><br>

-----

## ❤️ Support
If you enjoy the firmware please __**spread the word!**__ And if you really love it, maybe consider donating to the team? :D

> **[Ko-fi](https://ko-fi.com/willyjl)**: One-off or Recurring, No signup required

> **[PayPal](https://paypal.me/willyjl1)**: One-off, Signup required

> **BTC**: `1EnCi1HF8Jw6m2dWSUwHLbCRbVBCQSyDKm`

**Thank you <3**
