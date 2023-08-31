const Descriptions = {
    shader1: <p>Shader 1 is based on a shape morphing strategy, first starting with the SDF of a square, then deforming into a circle, and reforming into a square again.  It is rendered through a 2D ray tracing process which can make it somewhat computationally expensive, but allows for a bloom-like lighting effect that follows the contours of the shape.  No textures are used, and all coloration is generated procedurally.</p>,
    shader2: <p>Shader 2 uses fractional polar coordinates mixed with noise functions and 2D rotations to make a spinning and repeating pattern.  It consists of three total shader passes, with the first generating the shapes and colors, the second providing a slight afterimage tail, and the third for basic color correction and adjustment.</p>,
    shader3: <p>Shader 3 is the album art for the fourth part of <a href="https://heycharlieabbott.bandcamp.com/album/music-to-put-on-in-the-background-while-you-do-something-else-2" target="blank">Music To Put On In The Background While You Do Something Else</a> an 84 track, 5 hour long album of original music released in the summer of 2023.  This shader was an exercise in layering large shapes without fine details and with muted colors, then slowly adding higher frequency details using layered noise functions. </p>,
    shader4: <p>Shader 4 is an exercise in testing shader frequency foldover artifacts.  In simply adding a slight amount of noise to the uv coordinates, then multiplying the sin of the uv.x coordinate by a high number (in this case 10,000), interesting artifacts are created by the rounding mechanisms at the pixel level.  By resizing the window, the appearance will also change as this affects the amount of foldover occurring.</p>,
    shader5: <p>Shader 5 is based on a moving noise function with masking functions to define the boundaries of the noise’s geometry.  This is then combined with a second, ping-pong buffer shader stage to add a controlled afterimage effect, as well as one more shader stage for color correction.</p>,
    shader6: <p>Shader 6 is based on defining lines based off of the uv coordinates, then deforming those lines through rotations and sin functions over time.  The digital noise looking artifacts are added in the second stage, which uses ping pong buffers to selectively create a feedback and afterimage style effect.  The third shader pass in the sequence is used for color correction.</p>,
    shader7: <p>Shader 7 is an exercise in 2D progressive ray tracing using a ping pong buffer shader setup to accumulate pixel values over time. On first loading the shader, it appears dark and brightens over time as the pixel values accumulate, revealing the underlying shapes and colors with higher computational efficiency than if the same image was generated in a single shader pass.  One downside of this technique is that it does not allow for smooth animation due to the accumulation occurring over many frames.</p>,
    shader8: <p>Shader 8 uses game of life information that is seeded by uv coordinate noise values in the first shader pass.  The third shader pass adds color based on animated distance functions from a mask layer to the generated game of life information.</p>,
    shader9: <p>Shader 9 is primarily based on simulation information generated in the second of three shader stages.  The first shader stage is used to seed the simulation generated in the second shader stage, and the third shader stage is used for color correction.  Through adjusting the parameters of the simulation functions in the second shader over time, as well as adding and removing masking layers during this stage, the simulation continues to evolve.</p>,
    shader10: <p>Shader 10 is another shader based off game of life simulation information.  This shader uses masking layers and noise functions to periodically alternate between denser and more sparse simulation conditions.</p>,
    shader11: '',
    shader12: '',
    shader13: '',
    shader14: '',
    shader15: '',
    shader16: '',
    shader17: '',
    shader18: '',
    shader19: '',

}


export {Descriptions};