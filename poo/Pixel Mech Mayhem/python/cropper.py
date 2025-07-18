# Importa la clase Image del módulo PIL (Pillow)
from PIL import Image
import os

input_image_path = r"sample" # ruta de entrada
output_image_path = r"sample" # exit 

def crop_blue_robot_sprites(input_path, output_path):
    """
    Para poder seleccionar los sprites con las coordenadas en JS de la imagen 
    habia que remover los margenes para poder usar las medidas de 32*32 de manera mas natural

    la IA tardo tanto en hacer el recorte bien que arme el script con 2 googleadas

    Recorta la imagen en las medidas requeridas:
    NECESARIO: pip install pillow !!!
    r"txt" en los string de los paths para formato lectura
    Args:
        input_path: La ruta al archivo de imagen de entrada 
        output_path: La ruta donde sale el recorte
    """
    try:
        img = Image.open(input_path)

        left = 32       # cuanto recorta de izquierda
        upper = 38      # cuanto de arriba
        right = 224     # cuanto de derecha
        lower = 136     # cuanto de abajo

        # Realiza el recorte de la imagen
        cropped_img = img.crop((left, upper, right, lower))
        #guardar
        cropped_img.save(output_path)
        print(f"Sprites recortados guardados en: '{output_path}'")

    except FileNotFoundError:
        print(f"Error: El archivo '{input_path}' no se encontró.")
    except Exception as e:
        print(f"Ocurrió un error al procesar la imagen: {e}")

#tuqui :]
crop_blue_robot_sprites(input_image_path, output_image_path)
