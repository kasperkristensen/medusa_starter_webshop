# 🚀 Quick start

1.  **Add enviroment varaibles**

    Copy the template enviroment file, and add a Stripe test key.

    ```shell
    # copy template
    touch .env.development
    ```

    Should be:
        GATSBY_STRIPE_KEY=pk_test_something

2.  **Install dependencies**


    ```shell
    yarn
    ```

3.  **Run tests**

    ```shell
    yarn jest
    ```