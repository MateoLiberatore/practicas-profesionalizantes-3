from PIL import Image
import numpy as np
import svgwrite


"""
    Script para pasar una imagen a formato .SVG .
    Script para remover fondos.
    Script para VECTORIZAR una imagen :
        - solo apto para imagenes con bordes solidos y definidos
        - TOLERANCE : discriminar pixeles de fondo con figuras

    NECESARIO pip install: 
        - pillow 
        - Numpy
        - svgwrite

    r"txt" en los string de los paths para formato lectura
    Args:
        image_path: La ruta al archivo de imagen de entrada 
        output_svg_path: La ruta donde sale el recorte
    """
image_path = r"sample"

img = Image.open(image_path).convert("RGBA")
data = np.array(img)


bg_color = data[0, 0]                           # Detectar el color de fondo (esquina superior izquierda)

                                                # Tolerancia para distinguir fondo de contenido 
TOLERANCE =50                                   #(más alto el numero = más agresivo)


def is_similar(c1, c2, tolerance):              # Función para comparar colores con tolerancia
    return all(abs(int(c1[i]) - int(c2[i])) <= tolerance for i in range(3)) and c1[3] >= 10


height, width = data.shape[:2]
dwg = svgwrite.Drawing(size=(f"{width}px", f"{height}px"))      # Crear archivo SVG


for y in range(height):                         # Agregar píxeles distintos del fondo
    for x in range(width):
        r, g, b, a = data[y, x]
        pixel = (r, g, b, a)
        if not is_similar(pixel, bg_color, TOLERANCE) and a > 0:
            color_hex = f"#{r:02x}{g:02x}{b:02x}"
            dwg.add(dwg.rect(insert=(x, y), size=(1, 1), fill=color_hex))

# Guardar como SVG
output_svg_path = r"C:\Users\liber\Downloads\blue_robot_vector.svg"
dwg.saveas(output_svg_path)

print(f"SVG guardado en: {output_svg_path}")
