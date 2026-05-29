import os

class Config:
    raw_url = os.environ.get("DATABASE_URL", "")
    # Railway gives postgres:// but SQLAlchemy needs postgresql://
    SQLALCHEMY_DATABASE_URI = raw_url.replace("postgres://", "postgresql://") if raw_url else None
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
    