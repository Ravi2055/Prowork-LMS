import { Specialization } from '../types';

export const specializations: Specialization[] = [
  {
    id: 'fullstack',
    title: 'Fullstack Development',
    description: 'Master the art of building end-to-end web applications using modern technologies.',
    icon: 'Layout',
    color: 'bg-indigo-500',
    modules: [
      {
        id: 'fs-1',
        title: 'Modern Frontend with React',
        duration: '4 weeks',
        content: 'Deep dive into React hooks, state management (Redux/Zustand), and component architecture. Learn how to build responsive and interactive UIs using Tailwind CSS and Framer Motion.',
        resources: [
          { title: 'React Best Practices Guide', url: 'https://www.patterns.dev/posts/react-patterns', type: 'pdf' },
          { title: 'Tailwind CSS Cheat Sheet', url: 'https://tailwindcss.com/docs', type: 'pdf' }
        ]
      },
      {
        id: 'fs-2',
        title: 'Backend Mastery with Node.js',
        duration: '3 weeks',
        content: 'Build scalable APIs using Express.js. Understand middleware, authentication (JWT/OAuth), and server-side logic. Learn about asynchronous programming and error handling.',
        resources: [
          { title: 'Node.js Security Checklist', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html', type: 'pdf' }
        ]
      },
      {
        id: 'fs-3',
        title: 'Database Design & Integration',
        duration: '2 weeks',
        content: 'Learn SQL (PostgreSQL) and NoSQL (MongoDB) databases. Master ORMs like Prisma and TypeORM for efficient data handling and migrations.',
        resources: [
          { title: 'SQL Performance Tuning', url: 'https://use-the-index-luke.com/', type: 'pdf' }
        ]
      },
      {
        id: 'fs-4',
        title: 'DevOps & Cloud Deployment',
        duration: '2 weeks',
        content: 'Understand CI/CD pipelines, Docker containerization, and cloud platforms like AWS/Vercel. Learn how to monitor and scale your applications.',
        resources: [
          { title: 'Docker Cheat Sheet', url: 'https://docs.docker.com/get-started/', type: 'pdf' }
        ]
      }
    ],
    projects: [
      {
        id: 'p-fs-1',
        title: 'E-commerce Platform',
        difficulty: 'Advanced',
        description: 'Build a full-featured online store with product listings, cart functionality, and payment integration.',
        steps: [
          'Requirement Analysis: Define user stories (Buyer, Seller, Admin) and list core features.',
          'Database Architecture: Design a relational schema using PostgreSQL for Users, Products, Categories, Orders, and Reviews.',
          'Backend Setup: Initialize a Node.js project with Express and TypeScript. Set up Prisma ORM for database communication.',
          'API Development: Create secure REST endpoints for product management and user authentication (JWT).',
          'Frontend Foundation: Set up a React project with Vite, Tailwind CSS, and a routing library like React Router.',
          'State Management: Implement a global store (Zustand or Redux) to handle the shopping cart, user session, and product filters.',
          'Payment Integration: Implement Stripe Checkout and set up a backend webhook to handle successful payment events.',
          'Admin Dashboard: Build a protected interface for managing inventory, viewing orders, and tracking sales analytics.',
          'Testing & QA: Write unit tests for critical backend logic and end-to-end tests for the checkout flow.',
          'Security Audit: Implement rate limiting, input validation, and secure headers (Helmet).',
          'Performance Tuning: Optimize database queries with indexing and implement image lazy loading on the frontend.',
          'Deployment: Containerize the app with Docker and deploy the frontend to Vercel and the backend to a cloud provider.',
          'Post-Launch: Set up error tracking (Sentry) and basic analytics to monitor user behavior.'
        ]
      },
      {
        id: 'p-fs-2',
        title: 'Real-time Chat Application',
        difficulty: 'Intermediate',
        description: 'Create a messaging app with real-time updates using WebSockets.',
        steps: [
          'Architecture Planning: Choose between polling and WebSockets. Set up a basic Node.js server.',
          'Socket.io Integration: Implement the Socket.io server-side library to handle connections and events.',
          'Frontend Setup: Create a React app and integrate the Socket.io client to listen for incoming messages.',
          'User Authentication: Implement a simple login/signup flow to identify users in the chat.',
          'Real-time Messaging: Build the logic for sending, receiving, and broadcasting messages to specific rooms.',
          'Data Persistence: Set up MongoDB to store chat history so messages are available after a refresh.',
          'UI/UX Design: Create a responsive chat interface with message bubbles, timestamps, and user avatars.',
          'Advanced Features: Add "typing..." indicators, read receipts, and file/image sharing capabilities.',
          'Performance Optimization: Implement message pagination or infinite scrolling for long chat histories.',
          'Security: Sanitize all incoming messages to prevent XSS attacks in the chat window.',
          'Scalability: Explore using Redis as a pub/sub mechanism for scaling WebSockets across multiple server instances.',
          'Deployment: Deploy the WebSocket server to a platform that supports persistent connections (like Heroku or AWS).',
          'Maintenance: Implement a heartbeat mechanism to detect and clean up stale connections.'
        ]
      }
    ]
  },
  {
    id: 'datascience',
    title: 'Data Science',
    description: 'Extract insights from data using statistical analysis and visualization techniques.',
    icon: 'BarChart',
    color: 'bg-emerald-500',
    modules: [
      {
        id: 'ds-1',
        title: 'Python for Data Analysis',
        duration: '3 weeks',
        content: 'Master NumPy, Pandas, and Matplotlib. Learn how to clean, transform, and visualize complex datasets efficiently.',
        resources: [
          { title: 'Pandas Documentation PDF', url: 'https://pandas.pydata.org/docs/user_guide/index.html', type: 'pdf' },
          { title: 'NumPy Quickstart Guide', url: 'https://numpy.org/doc/stable/user/quickstart.html', type: 'pdf' }
        ]
      },
      {
        id: 'ds-2',
        title: 'Statistical Inference',
        duration: '3 weeks',
        content: 'Understand probability distributions, hypothesis testing, and regression analysis. Learn how to make data-driven decisions.',
        resources: [
          { title: 'Statistics for Data Science', url: 'https://openstax.org/details/books/introductory-statistics', type: 'pdf' }
        ]
      },
      {
        id: 'ds-3',
        title: 'Data Visualization & Storytelling',
        duration: '2 weeks',
        content: 'Learn to create compelling visual narratives using D3.js, Plotly, and Tableau. Focus on clarity and impact.',
        resources: [
          { title: 'Visualization Principles', url: 'https://paldhous.github.io/ucb/2016/dataviz/index.html', type: 'pdf' }
        ]
      },
      {
        id: 'ds-4',
        title: 'SQL for Data Science',
        duration: '2 weeks',
        content: 'Advanced SQL queries for data extraction, window functions, and complex joins. Learn how to interface Python with SQL databases.',
        resources: [
          { title: 'SQL for Analytics Guide', url: 'https://mode.com/sql-tutorial/', type: 'pdf' }
        ]
      }
    ],
    projects: [
      {
        id: 'p-ds-1',
        title: 'Market Trend Analysis',
        difficulty: 'Intermediate',
        description: 'Analyze historical market data to identify patterns and predict future trends.',
        steps: [
          'Data Acquisition: Use Python libraries like `yfinance` or `Alpha Vantage` to fetch historical stock or crypto data.',
          'Data Cleaning: Handle missing values, outliers, and ensure correct data types for time-series analysis.',
          'Exploratory Data Analysis (EDA): Calculate moving averages, volatility, and daily returns using Pandas.',
          'Visualization: Create interactive candlestick charts and volume bars using Plotly or Bokeh.',
          'Statistical Testing: Perform stationarity tests (ADF test) and check for seasonality in the data.',
          'Feature Engineering: Create technical indicators like RSI, MACD, and Bollinger Bands.',
          'Modeling: Implement a baseline forecasting model using ARIMA or Prophet.',
          'Evaluation: Compare model predictions against actual data using metrics like RMSE and MAE.',
          'Error Analysis: Identify specific time periods where the model fails and investigate the causes.',
          'Reporting: Summarize findings in a Jupyter Notebook with clear explanations of the observed trends.',
          'Presentation: Create a dashboard using Streamlit to allow users to explore different assets.',
          'Future Work: Propose how to incorporate sentiment analysis from news headlines to improve predictions.'
        ]
      },
      {
        id: 'p-ds-2',
        title: 'Customer Segmentation',
        difficulty: 'Advanced',
        description: 'Group customers based on purchasing behavior using clustering algorithms.',
        steps: [
          'Data Collection: Gather transactional data including CustomerID, InvoiceDate, and TransactionAmount.',
          'RFM Calculation: Compute Recency, Frequency, and Monetary values for each unique customer.',
          'Data Preprocessing: Scale and normalize the RFM metrics to ensure the clustering algorithm performs well.',
          'Optimal K Selection: Use the Elbow Method and Silhouette Score to determine the best number of clusters.',
          'Clustering Implementation: Apply the K-Means algorithm to segment the customer base.',
          'Cluster Profiling: Analyze the characteristics of each segment (e.g., "Champions", "At Risk", "New Customers").',
          'Visualization: Create 3D scatter plots or heatmaps to visualize the separation between segments.',
          'Business Strategy: Develop targeted marketing recommendations for each customer group.',
          'Validation: Test the stability of the clusters by running the algorithm on different time periods of data.',
          'Alternative Algorithms: Compare K-Means results with Hierarchical Clustering or DBSCAN.',
          'Final Documentation: Create a presentation deck explaining the segments and their business value.',
          'Automation: Write a script to automatically re-run the segmentation as new data arrives.'
        ]
      }
    ]
  },
  {
    id: 'aiml',
    title: 'AI & Machine Learning',
    description: 'Build intelligent systems that learn from data and make autonomous decisions.',
    icon: 'Brain',
    color: 'bg-violet-500',
    modules: [
      {
        id: 'ml-1',
        title: 'Supervised Learning',
        duration: '4 weeks',
        content: 'Master linear regression, decision trees, and support vector machines. Learn model evaluation techniques like Cross-Validation.',
        resources: [
          { title: 'Scikit-Learn User Guide', url: 'https://scikit-learn.org/stable/user_guide.html', type: 'pdf' }
        ]
      },
      {
        id: 'ml-2',
        title: 'Neural Networks & Deep Learning',
        duration: '4 weeks',
        content: 'Understand the architecture of neural networks. Build models using TensorFlow and PyTorch. Learn about backpropagation and optimization.',
        resources: [
          { title: 'Deep Learning Book (Goodfellow)', url: 'https://www.deeplearningbook.org/', type: 'pdf' },
          { title: 'PyTorch Cheat Sheet', url: 'https://pytorch.org/tutorials/beginner/ptcheat.html', type: 'pdf' }
        ]
      },
      {
        id: 'ml-3',
        title: 'Natural Language Processing',
        duration: '3 weeks',
        content: 'Learn text processing, sentiment analysis, and transformer models like BERT and GPT. Focus on tokenization and embeddings.',
        resources: [
          { title: 'NLP with Transformers', url: 'https://huggingface.co/course/chapter1/1', type: 'pdf' }
        ]
      },
      {
        id: 'ml-4',
        title: 'Computer Vision',
        duration: '3 weeks',
        content: 'Learn image processing techniques, CNNs, and object detection using OpenCV and YOLO.',
        resources: [
          { title: 'OpenCV Documentation', url: 'https://docs.opencv.org/', type: 'pdf' }
        ]
      }
    ],
    projects: [
      {
        id: 'p-ml-1',
        title: 'Image Recognition System',
        difficulty: 'Advanced',
        description: 'Develop a Convolutional Neural Network (CNN) to classify images with high accuracy.',
        steps: [
          'Dataset Preparation: Collect and organize images into training, validation, and test sets.',
          'Data Augmentation: Use techniques like rotation, flipping, and zooming to increase dataset diversity.',
          'Model Architecture: Design a CNN with layers for convolution, pooling, and dense connections.',
          'Transfer Learning: Implement a pre-trained model (e.g., MobileNetV2) and freeze its base layers.',
          'Training Setup: Define the loss function (Categorical Cross-Entropy) and optimizer (Adam).',
          'Model Training: Train the network while monitoring validation loss to avoid overfitting.',
          'Hyperparameter Tuning: Experiment with learning rates, batch sizes, and different activation functions.',
          'Evaluation: Test the model on unseen data and generate a confusion matrix and classification report.',
          'Model Compression: Explore techniques like quantization to make the model smaller for mobile deployment.',
          'Inference Pipeline: Create a script that takes a new image and outputs the predicted class with confidence.',
          'Deployment: Build a web interface using Streamlit or Gradio for users to upload and classify images.',
          'Monitoring: Log prediction confidence scores to identify classes where the model is struggling.'
        ]
      },
      {
        id: 'p-ml-2',
        title: 'Sentiment Analysis Bot',
        difficulty: 'Intermediate',
        description: 'Build a system that classifies text as positive, negative, or neutral.',
        steps: [
          'Data Sourcing: Download a labeled dataset like the IMDB movie reviews or Twitter sentiment data.',
          'Text Preprocessing: Implement a pipeline for lowercasing, removing special characters, and stop-word removal.',
          'Tokenization: Convert sentences into individual words or tokens using NLTK or SpaCy.',
          'Vectorization: Transform text into numerical data using techniques like TF-IDF or Word Embeddings.',
          'Model Selection: Choose a classification algorithm (e.g., Naive Bayes, Random Forest, or an LSTM).',
          'Training & Validation: Split the data and train the model, ensuring balanced classes.',
          'Performance Metrics: Calculate Accuracy, Precision, Recall, and F1-Score to evaluate the bot.',
          'Error Analysis: Inspect misclassified examples to understand linguistic nuances the model missed.',
          'Real-time Testing: Create a function that processes user input and returns a sentiment score.',
          'Integration: Connect the sentiment analysis logic to a simple chat interface or API.',
          'Optimization: Explore using transformer-based models (like BERT) for improved contextual understanding.',
          'Deployment: Deploy the model as a microservice using Docker and a REST API framework.'
        ]
      }
    ]
  }
];
