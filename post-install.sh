#!/bin/bash

# Define the destination directory
DEST_DIR="public"

# Create the destination directory if it doesn't exist
mkdir -p "$DEST_DIR"
mkdir -p "$DEST_DIR/assets"

# Copy the specified files
cp "node_modules/@ricky0123/vad-web/dist/vad.worklet.bundle.min.js" "$DEST_DIR/"
cp "node_modules/@ricky0123/vad-web/dist/silero_vad.onnx" "$DEST_DIR/"
cp "node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.mjs" "$DEST_DIR/assets"
cp node_modules/onnxruntime-web/dist/*.wasm "$DEST_DIR/assets"

echo "All specified files copied to $DEST_DIR. successfully"
