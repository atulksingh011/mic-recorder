#!/bin/bash

# Define the destination directory
PUBLIC_DIR="public"
ASSETS_DIR="$PUBLIC_DIR/assets"

# Create the destination directory if it doesn't exist
mkdir -p "$PUBLIC_DIR"
mkdir -p "$ASSETS_DIR"

# Copy the specified files
cp "node_modules/@ricky0123/vad-web/dist/vad.worklet.bundle.min.js" "$PUBLIC_DIR/"
cp "node_modules/@ricky0123/vad-web/dist/silero_vad.onnx" "$PUBLIC_DIR/"
cp "node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.mjs" "$ASSETS_DIR"
cp node_modules/onnxruntime-web/dist/*.wasm "$ASSETS_DIR"

echo "All specified files copied to $PUBLIC_DIR & $ASSETS_DIR. successfully"

# Path to the onnxruntime-web package
FILE_PATH="node_modules/onnxruntime-web/dist/ort.min.js"

# Check if the file exists
if [ -f "$FILE_PATH" ]; then
    # Use sed to replace the line in the file
    sed -i.bak 's|var mod=eval("quire".replace(/^/,"re"))(moduleName);|var mod=require(moduleName);|' "$FILE_PATH"
    echo "Modification completed. Backup created as ort.min.js.bak"
else
    echo "File not found: $FILE_PATH"
fi
