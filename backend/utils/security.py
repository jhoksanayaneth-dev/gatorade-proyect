# utils/security.py

import hashlib

def hash_password(password):
    salt = "mafis-salt"
    return hashlib.sha256(
        (password + salt).encode()
    ).hexdigest()