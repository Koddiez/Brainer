import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-xl shadow-lg max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-gray-100">About Brainer</h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-400">Empowering Nigeria’s Youth Through Innovation and Competition</p>
      </div>

      <div className="mt-12 space-y-10 text-gray-700 dark:text-gray-300 leading-relaxed">
        <div>
          <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">Our Mission</h2>
          <p>
            Our mission at Brainer is to ignite a passion for learning and problem-solving among Nigerian secondary school students. We believe that by providing a platform for healthy competition, we can unlock the immense potential within our youth, equipping them with the critical thinking, collaboration, and creative skills needed to become the leaders and innovators of tomorrow.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">What We Do</h2>
          <p>
            Brainer designs and hosts uniquely crafted academic competitions that blend the rigor of traditional subjects with the excitement of real-world challenges. Our events are more than just tests; they are immersive experiences that encourage students to think outside the box. We operate on a hybrid model, combining the accessibility of online platforms with the irreplaceable energy of physical, live events, making participation possible for students across Nigeria.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">Our Vision</h2>
          <p>
            We envision a future where every Nigerian student has the opportunity to showcase their talents, develop their skills, and connect with a network of peers and mentors who share their aspirations. We aim to build the largest and most impactful community of young thinkers and creators in Africa, fostering a generation that is confident, capable, and ready to tackle global challenges with local ingenuity.
          </p>
        </div>
        
        <div className="text-center pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Join Us on Our Journey</h3>
          <p className="mt-2">
            Whether you are a student, teacher, parent, or potential partner, we invite you to be a part of the Brainer movement. Together, let's build a brighter future for Nigeria, one competition at a time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;