from flask import Flask
from flask_cors import CORS

from routes.activos import activos_bp
from routes.orden_trabajo import orden_trabajo_bp
from routes.reporte_falla import reporte_falla_bp
# from routes.usuarios import usuarios_bp
from routes.usuarios import usuarios_bp

def create_app():

    app = Flask(__name__)

    CORS(app)

    app.register_blueprint(activos_bp)
    app.register_blueprint(orden_trabajo_bp)
    app.register_blueprint(reporte_falla_bp)
    app.register_blueprint(usuarios_bp)

    return app


if __name__ == '__main__':

    app = create_app()

    app.run(
        debug=True
    )