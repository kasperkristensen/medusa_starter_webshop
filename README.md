# 🚀 Quick start

1.  **Add enviroment varaibles**

    Move the `seed.json` file from `/data` to your `medusa_starter` project and use it to seed the database.


2.  **Add enviroment varaibles**

    Copy the template enviroment file, and add a Stripe test key.

    ```shell
    # copy template
    touch .env.development
    ```
    It should look like this
    > GATSBY_STRIPE_KEY=pk_test_something

3.  **Install dependencies**


    ```shell
    yarn
    ```

4.  **Run tests**

    ```shell
    yarn jest
    ```