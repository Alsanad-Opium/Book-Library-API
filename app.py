from dotenv import load_dotenv
load_dotenv()


from app import create_app


app = create_app()

if __name__ == '__main__':
    app.run(debug = True)
    
    # cmd to run Once the app is created and the models are defined we need to create the database and the tables in the databse using the flask-migrate package which is a wrapper around alembic to handle database migrations in flask applications
    
#     flask --app app db init
# flask --app app db migrate -m "create books table"
# flask --app app db upgrade