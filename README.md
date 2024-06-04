# CG 2023/2024

## Group T10G02
| Name             | Number    | E-Mail             |
| ---------------- | --------- | ------------------ |
| Pedro Beirão     | 202108718 | up202108718@up.pt  |
| André Santos     | 202108658 | up202108658@up.pt  |

----
This project was developed for the Computer Graphics course (L.EIC) at the Faculdade de Engenharia da Universidade do Porto. It aims to demonstrate the application of various computer graphics techniques using JavaScript and WebGL.

## Project Overview

The project creates an interactive 3D scene with the following main components:

- **Sky-Sphere**: A sky-sphere with moving clouds that serves as the background of the scene.
- **Terrain**: A grass-covered plane.
- **Flowers**: A diverse and randomized flower garden.
- **Bee**: An animated and user-controllable bee.
- **Rocks and Hive**: A pile of rocks with a beehive on top.
- **Shaders and Animation**: Animated grass to simulate wind effects.

## Objectives

- Apply knowledge and techniques acquired throughout the course.
- Implement interaction elements using the keyboard and GUI.
- Use shaders for modeling and visualizing objects.
- Create component animations.

## Features

### 1. Sky-Sphere
- **MySphere Class**: Created a sphere with adjustable slices and stacks, and applied a texture.
- **MyPanorama Class**: Displays an inverted sphere with a panoramic texture visible from inside, moving with the camera to simulate an infinite sky.

### 2. Flowers
- **Modeling**: Developed classes for flower components: `MyPetal`, `MyReceptacle`, `MyStem`, and `MyFlower`.
- **Parameterization**: Added parameters to customize the appearance of flowers, including the number of petals, stem size, and colors.
- **Randomness**: Implemented randomization for flower attributes to create diversity in the garden.
- **Textures**: Applied textures to petals, stems, and receptacles for realism.

### 3. Rocks and Boulders
- **MyRock Class**: Created rocks with modified vertices for a natural look.
- **MyRockSet Class**: Arranged multiple rocks into a pile with random scaling and orientation.

### 4. Bee
- **Modeling**: Developed the `MyBee` class using simple geometric shapes.
- **Animation**: Implemented continuous animations for flight and wing flapping.
- **Control**: Added keyboard controls to move the bee and interact with the scene, including picking up and dropping pollen.

### 5. Pollen and Hive
- **MyPollen Class**: Created pollen grains with a rough texture.
- **MyHive Class**: Modeled a beehive placed on the pile of rocks.
- **Interaction**: Implemented functionality for the bee to collect pollen from flowers and deposit it in the hive.

### 6. Shaders and Animation
- **Grass Modeling**: Covered the terrain with 3D grass blades using triangular ribbons.
- **Wind Effect**: Animated the grass to simulate waving in the wind using vertex displacement.

### 7. Additional Developments
- **Sky Animation**: Added cloud movement to the sky-sphere for a realistic sky simulation.

## Running the Project

To run the project locally, follow these steps:

1. **Clone the Repository**:
    ```bash
    git clone <GitHub Repository URL>
    cd project
    ```

2. **Install Dependencies**:
    Make sure you have a local server to run the project. You can use Python's simple HTTP server:
    ```bash
    python -m http.server
    ```

3. **Open in Browser**:
    Open your web browser and navigate to `http://localhost:8000`.

## Learning Outcomes

- Gained proficiency in using WebGL for 3D graphics rendering.
- Learned to implement and control object animations.
- Developed skills in applying textures and shaders for realistic effects.
- Enhanced understanding of interactive graphics programming and user interface design.

## Video Demonstration

A short video demonstrating the functionalities can be found [here](project-t1g1.mp4).

## Conclusion

This project demonstrates the integration of various computer graphics techniques and showcases the ability to create a dynamic and interactive 3D scene using JavaScript and WebGL. The emphasis on realism, interactivity, and creativity reflects the learning and skills acquired during the course.

---

**Course**: Licenciatura em Engenharia Informática e Computação  
**Institution**: Faculdade de Engenharia da Universidade do Porto  
**Year**: 2023/2024