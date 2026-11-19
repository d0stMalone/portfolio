export type ProjectCategory = "Robotics" | "Perception" | "Hardware"

export type Project = {
  slug: string
  title: string
  category: ProjectCategory
  featured?: boolean
  summary: string
  highlight?: string
  description: string
  features: string[]
  insights?: string[]
  github?: string
  image?: string
  imageAlt?: string
  imageLight?: boolean
  gallery?: { src: string; alt: string; light?: boolean }[]
  skills: string[]
}

export const projects: Project[] = [
  // ───────────── Featured robotics work ─────────────
  {
    slug: "sensor-fusion-navigation",
    title: "Sensor-Fusion Navigation with IMU, Magnetometer & GPS",
    category: "Robotics",
    featured: true,
    summary:
      "Estimated a car's heading, velocity and path from IMU, magnetometer and GPS data I logged with my own ROS drivers while driving around Boston — then dead-reckoned the route and compared it to GPS.",
    highlight: "Hard/soft-iron calibration + complementary filter for heading",
    description:
      "Built ROS drivers for a GPS receiver and an IMU, recorded ROS bags while driving in circles at Ruggles station and on a tour of Boston, and used the data to estimate heading, forward velocity and the vehicle's trajectory without relying on GPS alone.",
    features: [
      "ROS drivers: wrote the GPS and IMU drivers that published the data recorded into ROS bags.",
      "Magnetometer calibration: corrected hard-iron and soft-iron distortion by fitting and normalising the measurement ellipse.",
      "Heading estimation: fused magnetometer yaw and integrated gyro yaw with a complementary filter.",
      "Velocity estimation: integrated accelerometer data with bias correction and compared it against GPS-derived velocity.",
      "Dead reckoning: integrated velocities into displacement and overlaid the IMU trajectory on the GPS track.",
    ],
    insights: [
      "Gyro yaw is smooth but drifts; magnetometer yaw is absolute but noisy near metal — the filter takes the best of both.",
      "Small accelerometer biases grow into large velocity errors when integrated, which is why calibration matters.",
    ],
    github: "https://github.com/d0stMalone/Sensor-Fusion-Navigation-with-IMU-and-Magnetometer",
    image: "projects/sensor-fusion-mag-calibration.webp",
    imageAlt: "Magnetometer data before and after hard- and soft-iron calibration",
    imageLight: true,
    gallery: [
      {
        src: "projects/sensor-fusion-trajectory.webp",
        alt: "Dead-reckoned IMU trajectory compared with the GPS track",
        light: true,
      },
    ],
    skills: ["ROS", "Sensor Fusion", "IMU", "GPS", "Complementary Filter", "Dead Reckoning", "Python"],
  },
  {
    slug: "rl-7dof-arm",
    title: "Reinforcement Learning for a 7-DOF Robot Arm",
    category: "Robotics",
    featured: true,
    summary:
      "Trained and compared PPO, SAC, TD3 and DDPG on a simulated 7-DOF KUKA arm reaching task in PyBullet, with a Dijkstra joint-space planner as a classical baseline.",
    highlight: "SAC improved from about −191 to −20 average reward over 5,000 episodes",
    description:
      "Built a custom Gymnasium environment around a 7-DOF KUKA arm in PyBullet and used it to compare four deep reinforcement learning algorithms against a classical search-based planner on the same reaching task.",
    features: [
      "Custom environment: Gymnasium wrapper for a simulated KUKA arm with a distance-based reward and bonuses near the goal.",
      "Four algorithms: trained PPO, SAC, TD3 and DDPG agents for 5,000 episodes each and logged their learning curves.",
      "Classical baseline: Dijkstra planner over a discretised joint space using forward kinematics to check the goal.",
      "Safety checks: PyBullet-based self-collision checking for the arm.",
      "Extra robots: environments for a UR5 and a 6-DOF arm alongside the KUKA.",
    ],
    insights: [
      "SAC reached the best average reward; PPO learned fastest early on; DDPG plateaued almost immediately.",
    ],
    github: "https://github.com/d0stMalone/RL_Algo_7DOF",
    image: "projects/rl-7dof-curves.webp",
    imageAlt: "Learning curves for PPO, SAC, TD3 and DDPG on the 7-DOF reaching task",
    skills: ["Reinforcement Learning", "PyBullet", "PPO", "SAC", "TD3", "DDPG", "Python"],
  },
  {
    slug: "imu-noise-analysis",
    title: "IMU Noise Characterisation with Allan Variance",
    category: "Robotics",
    featured: true,
    summary:
      "Characterised an IMU's gyro and accelerometer noise from a 5-hour stationary recording using Allan variance, then compared the results with the VN-100 datasheet.",
    highlight: "Separated white noise from flicker (bias-instability) noise on all three gyro axes",
    description:
      "Collected long stationary, short stationary and moving datasets from an IMU and analysed them to understand what kinds of noise the sensor produces and how well it matches its specifications.",
    features: [
      "Long-duration logging: 5-hour stationary recording for Allan deviation analysis.",
      "Noise identification: estimated angle random walk and bias instability for each gyro axis.",
      "Static vs dynamic: compared quiet-room data with data recorded while moving the sensor in every direction.",
      "Datasheet comparison: checked measured noise parameters against the VN-100 specification.",
    ],
    insights: [
      "White noise dominates at short averaging times and flicker noise at longer ones; the X axis was the most stable.",
    ],
    github: "https://github.com/d0stMalone/IMU-Noise-Analysis-and-Performance-Evaluation",
    image: "projects/imu-allan-deviation.webp",
    imageAlt: "Allan deviation plot with noise parameters for the gyro X axis",
    imageLight: true,
    skills: ["IMU", "Allan Variance", "Sensor Characterisation", "MATLAB", "Python", "ROS"],
  },
  {
    slug: "camera-calibration-mosaic",
    title: "Camera Calibration & Panorama Mosaicing",
    category: "Robotics",
    featured: true,
    summary:
      "Calibrated a camera with a checkerboard, analysed reprojection error, and stitched photos of murals around campus into panoramas using Harris corners.",
    highlight: "Full pipeline from intrinsic calibration to stitched panoramas",
    description:
      "Calibrated a camera with a 7×9 checkerboard, studied the reprojection error, and then used feature detection and homographies to stitch overlapping photos of several murals into single panoramas.",
    features: [
      "Calibration: estimated intrinsics and distortion from ten checkerboard images.",
      "Error analysis: examined reprojection error patterns and extrinsic parameters.",
      "Feature detection: used Harris corners to find matching points between overlapping images.",
      "Mosaicing: stitched panoramas of murals with different amounts of overlap and texture.",
    ],
    github: "https://github.com/d0stMalone/Camera-Mosaic",
    image: "projects/camera-mosaic-mural.webp",
    imageAlt: "Panorama stitched from several photos of a colourful mural",
    skills: ["Camera Calibration", "Feature Detection", "Homography", "MATLAB", "Computer Vision"],
  },

  // ───────────── Hardware builds ─────────────
  {
    slug: "robotic-arm",
    title: "Precision-Controlled Articulated Robotic Arm",
    category: "Hardware",
    summary:
      "Designed and built a 3-DOF robotic arm with inverse kinematics for precision positioning and optimised motion control.",
    description:
      "Designed, built and programmed a 3-DOF articulated robotic arm, improving its responsiveness and accuracy through motion-control and software optimisation.",
    features: [
      "Built a 3-degree-of-freedom arm for controlled, precise movement.",
      "Servo control loops tuned for smooth motion.",
      "Inverse kinematics to reach target positions accurately.",
      "Trajectory planning for natural movement between poses.",
      "20% increase in operational efficiency through precise motor control and reduced error margins.",
    ],
    skills: ["Robotics", "Inverse Kinematics", "Servo Motors", "Motion Control", "3D Printing", "Embedded Systems"],
  },
  {
    slug: "quadruped",
    title: "Pneumatic-Driven Quadruped Robot",
    category: "Hardware",
    summary:
      "Designed a 4-legged robot with pneumatic actuation, a custom PCB and wireless control for navigating rough terrain.",
    description:
      "Designed and developed a 4-legged robot using pneumatic actuation for limb movement, with custom electronics and wireless control.",
    features: [
      "Pneumatic actuation for adaptive walking control.",
      "Custom air-control system to optimise stride on different surfaces.",
      "Master PCB built around an Arduino UNO for limb actuation.",
      "Bluetooth/ZigBee link for real-time wireless control.",
    ],
    skills: ["Robotics", "Pneumatics", "PCB Design", "Arduino", "Bluetooth", "ZigBee"],
  },

  // ───────────── Perception ─────────────
  {
    slug: "video-effects",
    title: "Real-Time Video Effects with OpenCV",
    category: "Perception",
    summary:
      "Real-time video processing in C++ with OpenCV: filters, face effects, selective colour and a faster separable blur.",
    description:
      "A Northeastern coursework project exploring real-time image manipulation in C++, from basic greyscale conversion to creative effects, with attention to performance.",
    features: [
      "Live video display with interactive keyboard controls.",
      "Greyscale, sepia, blur and Sobel edge detection.",
      "Face detection with a sparkle-halo effect.",
      "Faster blur using separable filters.",
      "Green-screen background replacement and an instant meme generator.",
    ],
    github: "https://github.com/d0stMalone/Video-Effects",
    image: "projects/video-effects-halo.png",
    imageAlt: "Video Effects project output: face detection with a halo effect",
    skills: ["C++", "OpenCV", "Real-time Processing"],
  },
  {
    slug: "image-retrieval",
    title: "Content-Based Image Retrieval",
    category: "Perception",
    summary:
      "Find visually similar images using colour histograms, texture filters and ResNet18 embeddings — and combinations of all three.",
    description:
      "Combined classical image features with deep embeddings to retrieve similar images from a database based on their content rather than metadata.",
    features: [
      "Baseline, histogram and multi-histogram matching.",
      "Texture features from Sobel, Laws, Gabor filters and Fourier transforms.",
      "ResNet18 embeddings compared with Euclidean and cosine distance.",
      "Custom hybrid metric combining embeddings, colour and edge features.",
    ],
    github: "https://github.com/d0stMalone/Content-based-Image-Retrieval",
    skills: ["Python", "PyTorch", "ResNet", "Feature Extraction"],
  },
  {
    slug: "object-recognition",
    title: "Real-Time 2D Object Recognition",
    category: "Perception",
    summary:
      "Segment, describe and classify objects from a live camera feed, and teach the system new objects on the fly.",
    description:
      "A real-time recognition system combining classical segmentation and shape features with KNN and a pre-trained network.",
    features: [
      "Thresholding and morphological filtering for segmentation.",
      "Hu moments, aspect ratio and centroid features.",
      "KNN classification with scaled Euclidean distance.",
      "Learns new objects on the fly; evaluated with a confusion matrix.",
    ],
    github: "https://github.com/d0stMalone/Real-Time-2-D-Object-Detection",
    skills: ["Computer Vision", "Machine Learning", "KNN", "OpenCV"],
  },
  {
    slug: "calibration-ar",
    title: "Calibration & Augmented Reality",
    category: "Perception",
    summary:
      "Calibrate a camera, track its pose in real time and project 3D virtual objects onto a live video feed.",
    description:
      "Chessboard-based calibration and pose tracking used to overlay virtual 3D objects onto real scenes in real time.",
    features: [
      "Chessboard calibration mapping 3D world points to 2D image points.",
      "Real-time camera pose tracking.",
      "Projection of 3D axes and virtual objects onto live video.",
      "SURF features for targets beyond the chessboard.",
    ],
    github: "https://github.com/d0stMalone/Calibration-and-Augmented-Reality",
    skills: ["OpenCV", "Camera Calibration", "3D Projection", "AR"],
  },
  {
    slug: "deep-recognition",
    title: "Handwriting Recognition with CNNs",
    category: "Perception",
    summary:
      "A PyTorch CNN for MNIST digits, extended to Greek letters with transfer learning and run live on a webcam.",
    description:
      "Trained a CNN on MNIST, adapted it to Greek letters via transfer learning, and connected it to a live video feed.",
    features: [
      "CNN with convolution, pooling and dropout layers.",
      "Transfer learning to alpha, beta, gamma and more Greek letters.",
      "Live webcam digit recognition with OpenCV.",
      "Architecture experiments, including Gabor filters in the first layer.",
    ],
    github: "https://github.com/d0stMalone/Recognition-using-Deep-Network",
    skills: ["PyTorch", "CNN", "Transfer Learning", "OpenCV"],
  },
  {
    slug: "lane-detection",
    title: "Lane Detection for Autonomous Driving",
    category: "Perception",
    summary:
      "Classical and deep-learning lane detection: Canny + Hough, sliding windows, curvature estimation and a U-Net trained on TuSimple.",
    description:
      "A lane detection pipeline for autonomous vehicles combining classical image processing with a U-Net segmentation model.",
    features: [
      "Canny edges, Hough transform and colour-space analysis.",
      "Perspective transform and sliding-window lane tracking.",
      "Polynomial fitting with curvature and vehicle-offset estimation.",
      "U-Net lane segmentation trained on the TuSimple dataset.",
    ],
    github: "https://github.com/d0stMalone/Lane-Detection",
    skills: ["OpenCV", "U-Net", "Deep Learning", "Autonomous Vehicles"],
  },
]
