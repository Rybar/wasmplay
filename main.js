const memory = new WebAssembly.Memory( { initial: 100 } );

const imports = {
    js: {
        mem: memory
    }
};

fetch('./canvashello.wasm')
    .then(response => response.arrayBuffer())
    .then(bytes => WebAssembly.compile(bytes))
    .then(module => new WebAssembly.Instance(module, imports))
    .then(instance => {
        // Set the pixel data in the module's memory
        const res = instance.exports.run();

        //set 500 random pixels to white
        for (let i = 0; i < 500; i++) {
            const x = Math.floor(Math.random() * 512);
            const y = Math.floor(Math.random() * 512);
            color = 0xffffffff;
            instance.exports.pset(x, y, color);
        }


        // Put the module's memory into an array suitable for use in ImageData.
        // Allocate width x height x number of colour planes (RGBA = 4)
        const byteArray = new Uint8ClampedArray( memory.buffer, 0, 512 * 512 * 4 );

        // Create an ImageData instance from the array
        const img = new ImageData( byteArray, 512, 512 );

        // Get the canvas element from the DOM
        const canvas = document.getElementById('c');

        // Get a 2D graphics context for the canvas
        const ctx = canvas.getContext('2d');

        // Put the image data into the canvas
        ctx.putImageData( img, 0, 0 );
    });