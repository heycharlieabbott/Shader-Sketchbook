const Descriptions = {
    shader1: <p>Shader 1 is based on a shape morphing strategy, first starting with the SDF of a square, then deforming into a circle, and reforming into a square again.  It is rendered through a 2D raytracing process which can make it somewhat computationally expensive, but allows for a bloom-like lighting effect that follows the contours of the shape.  No textures are used, and all coloration is generated procedurally.</p>,
    shader2: <p>Shader 2 uses fractional polar coordinates mixed with noise functions and 2D rotations to make a spinning and repeating pattern.  It consists of three total shader passes, with the first generating the shapes and colors, the second providing a slight afterimage tail, and the third for basic color correction and adjustment.</p>,
    shader3: <p>Shader 3 is the album art for the fourth part of <a href="https://heycharlieabbott.bandcamp.com/album/music-to-put-on-in-the-background-while-you-do-something-else-2" target="blank">Music To Put On In The Background While You Do Something Else</a> an 84 track, 5 hour long album of original music released in the summer of 2023.  This shader was an exercise in layering large shapes without fine details and with muted colors, then slowly adding higher frequency details using layered noise functions. </p>,
    shader4: <p>Shader 4 is an exercise in testing shader frequency foldover artifacts.  In simply adding a slight amount of noise to the uv coordinates, then multiplying the sin of the uv.x coordinate by a high number (in this case 10,000), interesting artifacts are created by the rounding mechanisms at the pixel level.  By resizing the window, the appearance will also change as this affects the amount of foldover occurring.</p>,
    shader5: <p>Shader 5 is based on a moving noise function with masking functions to define the boundaries of the noise’s geometry.  This is then combined with a second, ping-pong buffer shader stage to add a controlled afterimage effect, as well as one more shader stage for color correction.</p>,
    shader6: 'e',
    shader7: 'f',
    shader8: 'g',
    shader9: 'h',
    shader10: 'i',
    shader11: 'j',
    shader12: 'k',
    shader13: 'l',
    shader14: 'm',
    shader15: 'n',
    shader16: 'o',
    shader17: 'p',
    shader18: 'q',
    shader19: 'r',

}


export {Descriptions};