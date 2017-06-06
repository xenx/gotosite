# Create dummy secrey key so we can use sessions
SECRET_KEY = '123456790'

# Create in-memory database
DATABASE_FILE = 'test.sqlite'
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + DATABASE_FILE
SQLALCHEMY_ECHO = True

# Flask-Security config
SECURITY_URL_PREFIX = "/admin"
SECURITY_PASSWORD_HASH = "pbkdf2_sha512"
SECURITY_PASSWORD_SALT = "ATGUOHAELKiubahiughaerGOJAEGj"

# Flask-Security URLs, overridden because they don't put a / at the end
SECURITY_LOGIN_URL = "/login/"
SECURITY_LOGOUT_URL = "/logout/"
SECURITY_REGISTER_URL = "/register/"

SECURITY_POST_LOGIN_VIEW = "/"
SECURITY_POST_LOGOUT_VIEW = "/"
SECURITY_POST_REGISTER_VIEW = "/"

# Flask-Security features
SECURITY_REGISTERABLE = True
SECURITY_SEND_REGISTER_EMAIL = False
SQLALCHEMY_TRACK_MODIFICATIONS = False

# If you build new db this will add admin user with all needed stuff
INIT_DB = True

# Flask common vals

PORT = 8000
HOST = '0.0.0.0'
DEBUG = True
