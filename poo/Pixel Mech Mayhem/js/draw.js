export function drawFrame(frameX, frameY, canvasX, canvasY,
    context, img, width, height, scaledWidth, scaledHeight)
{
    context.drawImage(img,
    frameX * width, frameY * height, width, height,
    canvasX, canvasY, scaledWidth, scaledHeight);
}

export function flipView(
            frameX, frameY,
            canvasX, canvasY,
            context, img,
            width, height,
            scaledWidth, scaledHeight)
{
        context.save(); // Guardamos el estado del contexto
        context.translate(canvasX + scaledWidth, canvasY);
        context.scale(-1, 1); // espejo
    
        drawFrame(
            frameX, frameY,
            0, 0,
            context, img,
            width, height,
            scaledWidth, scaledHeight
        );
    
        context.restore(); // Restauramos el contexto original
}

