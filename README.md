# ShakeToShuffle

ShakeToShuffle is a lightweight, web-based shuffling tool that lets you randomize a list of options with a fun, two-phase animation. Users enter a list of comma-separated options, and they can trigger a shuffle either by clicking a button or simply by shaking their smartphone. The app first “floats” the options into random positions before settling them into a neatly wrapped grid that reflects the new shuffled order. The final order is also displayed as a numbered list below the grid.

## Features

- **Responsive Grid Layout:**  
  Options are displayed in a neat grid that wraps to new lines as needed.

- **Two-Phase Shuffle Animation:**  
  Options float to random intermediate positions and then slide back into a shuffled grid layout.

- **Shake-to-Shuffle:**  
  Uses the DeviceMotion API to detect a smartphone shake (with appropriate permission requests on iOS) as a trigger to shuffle.

- **Lightweight & Static:**  
  Built with vanilla JavaScript and Tailwind CSS, making it easy to deploy via GitHub Pages.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/lepari23/ShakeToShuffle.git
   ```

2. Open the Project:
- Once cloned, you can open index.html directly in your browser.
- Alternatively, visit: [Spin To Decide Live Demo](https://lepari23.github.io/ShakeToShuffle/)


## Usage
1.	Enter Options:
    Type your comma-separated options into the text area.
2.	Set Options:
    Click the Set Options button to render your options in an orderly grid.
3.	Shuffle:
    Click the Shuffle button or simply shake your smartphone to trigger the two-phase animation:
    * Phase 1: Options float to a random intermediate position.
    * Phase 2: They settle into a shuffled grid layout.
4.	View Final Order:
    The final shuffled order is updated and displayed as a numbered list below the grid.
5.	Reset:
    Click the Reset button to clear all options and start over.

## File Structure
* `index.html`:
    * Contains the HTML structure and layout of the app.
* `script.js`:
    * Implements option management, two-phase shuffle animation, and shake detection using the DeviceMotion API.
* `styles.css`:
    * Provides custom CSS transitions and additional styling alongside Tailwind CSS.

## Customization
* Tailwind CSS:
    The project uses Tailwind CSS via CDN. Customize the look by modifying Tailwind utility classes in the HTML.
* Animation Timing:
    Adjust the timing for the floating and settling phases in script.js and the CSS transition durations in styles.css.

## Compatibility
* Mobile Devices:
    Shake-to-shuffle requires motion sensor support. On iOS devices (iOS 13+), users will be prompted for permission to access motion sensors.
* Modern Browsers:
    Designed to work on modern browsers with support for HTML5, CSS3, and the DeviceMotion API.

## Contributing
Contributions are welcome! If you have suggestions or improvements, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License.