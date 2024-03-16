export function getTopPredominantColors(file: File): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // When the file is loaded
    reader.onload = (event) => {
      if (!event.target || !event.target.result) {
        reject(new Error("Failed to read file"));
      }

      const image = new Image();
      image.src = event.target!.result!.toString();

      // When the image is loaded
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Could not create canvas context"));
          return;
        }

        canvas.width = image.width;
        canvas.height = image.height;

        // Draw image onto canvas
        ctx.drawImage(image, 0, 0);

        // Get image data
        const imageData = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        ).data;

        // Count color occurrences
        const colorCounts = new Map<string, number>();
        for (let i = 0; i < imageData.length; i += 4) {
          const rgba = `rgba(${imageData[i]}, ${imageData[i + 1]}, ${
            imageData[i + 2]
          }, ${imageData[i + 3]})`;
          colorCounts.set(rgba, (colorCounts.get(rgba) || 0) + 1);
        }

        // Sort colors by count
        const sortedColors = Array.from(colorCounts.entries()).sort(
          (a, b) => b[1] - a[1]
        );

        // Get top 5 colors
        const topColors = sortedColors.slice(0, 5).map(([color]) => color);

        resolve(topColors);
      };

      // Handle image loading errors
      image.onerror = () => {
        reject(new Error("Failed to load image"));
      };
    };
    // Read file as data URL
    reader.readAsDataURL(file);
  });
}
