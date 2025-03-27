"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Github, ExternalLink } from "lucide-react"

const projects = [
  {
    title: "Real-Time Video Effects Using OpenCV",
    summary:
      "Advanced real-time video processing project using OpenCV in C++ with interactive controls and custom visual effects.",
    description:
      "As part of my coursework at Northeastern University, developed an advanced real-time video processing project using OpenCV in C++. This project explores various image manipulation techniques, from fundamental grayscale conversion to creative visual effects, optimizing both performance and functionality.",
    features: [
      "Live Video Processing: Implemented a real-time video display system with user-interactive controls.",
      "Advanced Filters & Transformations: Applied grayscale, sepia tone, blurring, and edge detection (Sobel filters).",
      "Selective Colorization: Highlighted the most dominant colors while turning the rest grayscale.",
      "Dynamic Face Effects: Added effects like a halo of sparkles above detected faces.",
      "Embossing & Contrast Control: Enhanced images using Sobel-based embossing and real-time contrast adjustments.",
      "Performance Optimization: Developed a faster blur algorithm using separable filters for improved efficiency.",
      "Meme Generator: Allowed users to add captions to frames, creating instant memes.",
      "Green Screen Effect: Replaced backgrounds dynamically based on color masking.",
    ],
    github: "https://github.com/d0stMalone/Video-Effects",
    skills: ["C++", "OpenCV", "Computer Vision", "Real-time Processing", "Image Manipulation"],
  },
  {
    title: "Content-Based Image Retrieval Using Computer Vision & Deep Learning",
    summary:
      "Developed a system that analyzes, matches, and retrieves similar images based on content using both classical techniques and deep learning.",
    description:
      "In this project, I explored pattern recognition and content-based image retrieval (CBIR) by combining classical image processing techniques with deep learning-based feature extraction. The goal was to develop a system that can analyze, match, and retrieve similar images from a database based on their content, rather than relying on metadata or filenames.",
    features: [
      "Baseline Image Matching: Simple pixel-level matching using sum-of-squared differences.",
      "Histogram-Based Matching: Leveraging HSV color histograms for more robust comparisons.",
      "Multi-Histogram Approach: Combining global and local features for better accuracy.",
      "Texture & Edge Detection: Using Sobel filters, Laws filters, Gabor filters, and Fourier Transforms to extract texture-based features.",
      "Deep Learning (DNN Embeddings): Implemented ResNet18 to generate high-dimensional feature vectors and compare images using Euclidean and Cosine distances.",
      "Hybrid Approach: Combined deep features with classical feature extraction (e.g., Sobel gradients) for improved image similarity matching.",
      "Face Detection & Content-Based Search: Incorporated OpenCV's Haar cascade to enhance face-based image retrieval.",
      "Custom Image Similarity Metric: Designed a novel approach by combining DNN embeddings, color histograms, and edge-based features for more accurate matching.",
    ],
    insights: [
      "Classical vs. Deep Learning Approaches: Comparing traditional histogram-based techniques with modern CNN-based feature extraction.",
      "Optimizing Distance Metrics: Analyzed how sum-square distances and cosine similarity impact retrieval accuracy.",
      "Feature Fusion: Successfully integrated handcrafted features with DNN embeddings to improve retrieval robustness.",
    ],
    github: "https://github.com/d0stMalone/Content-based-Image-Retrieval",
    skills: ["Computer Vision", "Deep Learning", "Python", "PyTorch", "ResNet", "Feature Extraction"],
  },
  {
    title: "Real-Time 2D Object Recognition using Computer Vision & Deep Learning",
    summary:
      "Built a real-time object recognition system that identifies, classifies, and learns new objects dynamically using computer vision and machine learning.",
    description:
      "In this project, I built a real-time object recognition system that enables computers to identify, classify, and even learn new objects dynamically. The system combines classical image processing, machine learning, and deep learning to achieve accurate and adaptable recognition, making it suitable for robotics, automation, and AI applications.",
    features: [
      "Real-Time Object Segmentation: Extracts objects from a live video stream using thresholding and morphological filtering.",
      "Feature-Based Recognition: Uses Hu Moments, Aspect Ratio, and Centroid Detection to classify objects based on shape and spatial properties.",
      "Machine Learning Classification: Implements K-Nearest Neighbours (KNN) and scaled Euclidean distance for object matching.",
      "Deep Learning Integration: Employs a pre-trained neural network (DNN) for enhanced feature extraction and classification.",
      "Adaptive Learning: The system can learn and classify new objects on the fly, updating its knowledge base dynamically.",
      "Performance Evaluation: Assesses accuracy using a confusion matrix and multiple test cases.",
    ],
    github: "https://github.com/d0stMalone/Real-Time-2-D-Object-Detection",
    skills: [
      "Computer Vision",
      "Machine Learning",
      "Deep Learning",
      "Object Recognition",
      "KNN",
      "Real-time Processing",
    ],
  },
  {
    title: "Calibration and Augmented Reality",
    summary:
      "Built an augmented reality system that overlays virtual objects onto real-world environments in real-time using computer vision techniques.",
    description:
      "In this project, I explored the fascinating realm of augmented reality (AR) and camera calibration, building a system that seamlessly overlays virtual objects onto real-world environments in real-time. By leveraging computer vision techniques and OpenCV, I enabled accurate detection of key features and precise spatial mapping.",
    features: [
      "Camera Calibration & Feature Detection: Used chessboard-based calibration to accurately translate 3D real-world points into 2D image points, ensuring seamless AR overlays.",
      "Real-Time Camera Position Tracking: Implemented algorithms to dynamically track the camera's movement and adjust virtual objects accordingly.",
      "3D Object Projection & Augmented Reality: Brought virtual objects to life by projecting 3D axes and interactive digital elements onto live video feeds.",
      "Robust Feature Recognition: Used Speeded-Up Robust Features (SURF) to detect objects beyond predefined patterns, making AR applications more adaptable.",
      "Multi-Target & Camera Adaptability: Extended the system to recognize multiple targets simultaneously and tested across different camera setups for accuracy.",
    ],
    github: "https://github.com/d0stMalone/Calibration-and-Augmented-Reality",
    skills: ["Augmented Reality", "Computer Vision", "OpenCV", "Camera Calibration", "3D Projection", "SURF"],
  },
  {
    title: "Recognition using Deep Learning",
    summary:
      "Developed a CNN using PyTorch to recognize handwritten digits and Greek letters with real-time video recognition capabilities.",
    description:
      "In this project, I developed and trained a Convolutional Neural Network (CNN) using PyTorch to recognize handwritten digits from the MNIST dataset and later adapted it to classify Greek letters through transfer learning.",
    features: [
      "Neural Network for Handwritten Digit Recognition: Built a CNN with multiple convolutional and pooling layers to classify handwritten digits with high accuracy.",
      "Dropout Layers: Implemented dropout layers to reduce overfitting and improve generalization.",
      "Transfer Learning for Greek Letters: Modified the trained CNN to recognize alpha, beta, gamma, and later extended it to more Greek letters.",
      "Real-Time Digit Recognition: Integrated the trained model with OpenCV for live video digit detection using a webcam.",
      "Dynamic Processing: Processed video frames in real-time, isolating and recognizing handwritten numbers dynamically.",
      "Architecture Experimentation: Explored different CNN architectures by varying layers, filters, and dropout rates to achieve optimal performance.",
      "Gabor Filter Integration: Integrated Gabor filters in the first CNN layer to enhance feature extraction for digit recognition.",
    ],
    github: "https://github.com/d0stMalone/Recognition-using-Deep-Network",
    skills: ["Deep Learning", "PyTorch", "CNN", "Transfer Learning", "OpenCV", "Real-time Recognition"],
  },
  {
    title: "Autonomous Lane Detection using Computer Vision",
    summary:
      "Developed a computer vision-based lane detection system for autonomous vehicles using edge detection, color transformations, and deep learning.",
    description:
      "In this project, I developed a computer vision-based lane detection system using OpenCV, aimed at assisting autonomous vehicles in identifying road lanes under various conditions. This system utilizes edge detection, color space transformations, and polynomial fitting to accurately track lane markings in real time.",
    features: [
      "Traditional Image Processing: Used Canny Edge Detection and Hough Transform to identify lane markings.",
      "Noise Reduction: Applied Gaussian Blur for noise reduction and enhanced accuracy.",
      "Advanced Color Space Analysis: Explored the effectiveness of RGB, HSV, and HSL color spaces for robust lane detection.",
      "Adaptive Filtering: Implemented adaptive filtering to handle different lighting and weather conditions.",
      "Sliding Window Technique: Used a sliding window technique to track lane boundaries dynamically.",
      "Polynomial Curve Fitting: Applied second-order polynomial curve fitting to maintain lane continuity.",
      "Lane Curvature Estimation: Computed lane curvature and vehicle offset to improve autonomous navigation.",
      "Perspective Transformation: Integrated perspective transformation for accurate road mapping.",
      "Deep Learning Integration: Experimented with U-Net (CNN Architecture) to segment lane lines from road images.",
      "Dataset Training: Used TuSimple dataset to train the model for improved detection in complex environments.",
    ],
    github: "https://github.com/d0stMalone/Lane-Detection",
    skills: ["Computer Vision", "OpenCV", "Deep Learning", "U-Net", "Autonomous Vehicles", "Image Processing"],
  },
  {
    title: "Precision-Controlled Articulated Robotic Arm",
    summary:
      "Designed and built a 3-DOF robotic arm with inverse kinematics for precision positioning and optimized motion control.",
    description:
      "This project involved the design, construction, and programming of a 3-DOF articulated robotic arm, engineered for enhanced efficiency and precision in real-world applications. By implementing advanced motion control algorithms and optimizing software performance, I improved the system's responsiveness and accuracy.",
    features: [
      "Robotic Arm Construction: Designed and built a 3-degree-of-freedom (3-DOF) robotic arm for controlled and precise movement.",
      "Servo Motor Control: Implemented servo motors with optimized control loops to achieve smooth motion.",
      "Inverse Kinematics: Programmed the arm using inverse kinematics algorithms, allowing it to reach target positions with high accuracy.",
      "Trajectory Planning: Integrated trajectory planning for seamless and natural movement.",
      "Performance Optimization: Optimized the software to enhance speed and response time, ensuring efficient operation.",
      "Efficiency Improvement: Achieved a 20% increase in operational efficiency through precise motor control and reduced error margins.",
      "Industrial Applications: The arm can be utilized in pick-and-place operations, assembly lines, and automation systems.",
      "Integration Potential: Designed for potential integration with computer vision systems for enhanced functionality.",
    ],
    skills: ["Robotics", "Inverse Kinematics", "Servo Motors", "Motion Control", "3D Printing", "Embedded Systems"],
  },
  {
    title: "Pneumatic-Driven Quadruped Robot",
    summary:
      "Designed a 4-legged robot with pneumatic actuation, custom PCB, and wireless control for navigating complex terrains.",
    description:
      "This project focused on designing and developing a 4-legged quadruped robot, leveraging pneumatic actuation for smooth and efficient limb movement. By integrating custom electronics, wireless control, and advanced maneuverability, this robot is designed to navigate challenging terrains, making it useful for exploration and industrial applications.",
    features: [
      "Pneumatic Actuation: Integrated pneumatic-driven limb movement for precise and adaptive walking control.",
      "Custom Air Control System: Designed a custom air control system to optimize stride efficiency on varied surfaces.",
      "Custom PCB Design: Designed and fabricated a master PCB board incorporating Arduino UNO for efficient limb actuation.",
      "Wireless Connectivity: Implemented Bluetooth/ZigBee connectivity for wireless remote control, ensuring reliable and real-time communication.",
    ],
    skills: ["Robotics", "Pneumatics", "PCB Design", "Arduino", "Bluetooth", "ZigBee", "Mechanical Design"],
  },
]

function ProjectCard({ project }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      layout
      className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-700 overflow-hidden"
    >
      <motion.div layout className="flex justify-between items-start">
        <div>
          <motion.h3 layout className="text-2xl font-semibold text-cyan-300">
            {project.title}
          </motion.h3>
        </div>
        <motion.button
          layout
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-2 rounded-full hover:bg-gray-700/50 transition-all ${isExpanded ? "rotate-180" : ""}`}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Show less" : "Show more"}
        >
          <ChevronDown className="w-5 h-5 text-cyan-300" />
        </motion.button>
      </motion.div>

      <motion.div layout className="mt-4">
        <motion.p layout className="text-gray-300">
          {project.summary}
        </motion.p>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 space-y-6"
          >
            <p className="text-gray-300">{project.description}</p>

            {project.features && project.features.length > 0 && (
              <div>
                <h4 className="text-lg font-medium text-cyan-300 mb-2">Key Features</h4>
                <ul className="space-y-2">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="text-gray-300 flex">
                      <span className="text-cyan-500 mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.insights && project.insights.length > 0 && (
              <div>
                <h4 className="text-lg font-medium text-cyan-300 mb-2">Technical Insights</h4>
                <ul className="space-y-2">
                  {project.insights.map((insight, idx) => (
                    <li key={idx} className="text-gray-300 flex">
                      <span className="text-cyan-500 mr-2">•</span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.github && (
              <div className="flex items-center">
                <Github className="w-5 h-5 text-cyan-300 mr-2" />
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center"
                >
                  View Project Code
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div layout className="mt-4 flex flex-wrap gap-2">
        {project.skills &&
          project.skills.map((skill, idx) => (
            <motion.span layout key={idx} className="bg-cyan-500/10 text-cyan-300 px-3 py-1 rounded-full text-sm">
              {skill}
            </motion.span>
          ))}
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-20"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 gradient-text">Projects</h2>
        <div className="space-y-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

