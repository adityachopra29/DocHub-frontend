# DocHub

#### The document managment system where you can create, store, share and even collaborate on document all at one place, similiar to notion, just specific to the Information Managment Group maintainers 

#### To run the application, follow the steps:

- Run the following command in the terminal:

        git clone https://github.com/adityachopra29/DocHub-frontend.git
        
        git clone https://github.com/adityachopra29/DocHub.git

        HOST=localhost PORT=1212 npx y-websocket
    
- Create a database to be used by the application
- Open the folder named DocHub and from the env-example file add the values for the Database_User, Password and Name and the rename the file to .env

- In same folder run command:

        python3 manage.py makemigrations
        python3 manage.py migrate  
        python3 manage.py runserver

- Open folder named DocHub-frontend and in terminal run :

        yarn install
        yarn dev

- In browser open localhost at port 5173

- This application will only authenticate Channeli maintainers ie: IMG Members