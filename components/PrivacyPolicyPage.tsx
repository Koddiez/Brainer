import React from 'react';

const PrivacyPolicyPage: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-xl shadow-lg max-w-4xl mx-auto prose lg:prose-lg dark:prose-invert">
    <h1 className="text-center">Privacy Policy for Brainer</h1>
    <p className="text-center text-sm text-gray-500">
      <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
    </p>

    <p className="lead">
      Welcome to Brainer ("we," "our," "us"). This Privacy Policy is designed to inform you about how we collect, use, share, and protect the personal information of our users, particularly the secondary school students in Nigeria who engage with our educational platform and competitions (our "Services"). We are deeply committed to protecting your privacy and ensuring a safe, transparent, and empowering online environment.
    </p>

    <hr/>

    <h2>1. The Information We Collect</h2>
    <p>We collect information that is necessary to provide and improve our Services, manage your participation, and ensure a secure experience. The types of information we collect include:</p>
    
    <h3>1.1. Information You Provide Directly</h3>
    <ul>
      <li><strong>Account Registration Data:</strong> When you create a Brainer account, we collect personal details such as your full name, email address, school name, and academic level (e.g., JSS1, SS2).</li>
      <li><strong>Competition and Course Data:</strong> When you register for a competition or enroll in a course, we collect information related to that specific event, including your submissions, project files, answers, and any team member details.</li>
      <li><strong>Communication Data:</strong> If you contact us for support or provide feedback, we will collect the information you include in your communications.</li>
    </ul>

    <h3>1.2. Information We Collect Automatically</h3>
    <ul>
      <li><strong>Usage and Technical Data:</strong> We automatically collect information about how you interact with our platform, such as your IP address, browser type, device information, pages visited, and the dates and times of your visits. This helps us understand usage patterns and improve our Services.</li>
      <li><strong>Cookies and Similar Technologies:</strong> We use cookies (small text files stored on your device) to help our platform function effectively, remember your preferences, and analyze site traffic. You can control cookie settings through your browser.</li>
    </ul>

    <hr/>

    <h2>2. How We Use Your Information</h2>
    <p>We use the information we collect for the following purposes:</p>
    <ul>
      <li><strong>To Provide and Manage Services:</strong> To create and maintain your account, process your registrations for competitions and courses, track your progress, and award points and badges.</li>
      <li><strong>To Communicate With You:</strong> To send important notifications about your account, competition deadlines, event updates, and other service-related announcements.</li>
      <li><strong>To Enhance User Experience:</strong> To personalize your dashboard, display your achievements on leaderboards (with your consent where applicable), and provide features like our AI Coach and AI Tutor.</li>
      <li><strong>To Improve Our Platform:</strong> To analyze how our Services are used, diagnose technical issues, and develop new features and competitions.</li>
      <li><strong>For Safety and Security:</strong> To protect the integrity of our competitions, prevent fraud, and ensure a safe environment for all users.</li>
    </ul>

    <hr/>

    <h2>3. How We Share and Disclose Information</h2>
    <p><strong>We do not sell your personal data.</strong> We only share your information in the following limited circumstances:</p>
    <ul>
      <li><strong>With Your Consent:</strong> We may share information with your consent, for example, when announcing competition winners or featuring a successful project.</li>
      <li><strong>Publicly for Recognition:</strong> Your name, school, and achievements (like points and badges) may be displayed on public-facing leaderboards to foster a sense of community and healthy competition.</li>
      <li><strong>With Service Providers:</strong> We may share information with trusted third-party vendors who perform services on our behalf, such as cloud hosting and data analytics. These providers are contractually obligated to protect your data and use it only for the purposes we specify.</li>
      <li><strong>For Legal Reasons:</strong> We may disclose your information if required by law, regulation, or a valid legal process, or to protect the rights, property, and safety of Brainer, our users, or the public.</li>
    </ul>

    <hr/>

    <h2>4. Data Security and Retention</h2>
    <p>We implement robust administrative, technical, and physical security measures to protect your information from unauthorized access, use, or disclosure. However, no internet-based service is 100% secure, and we cannot guarantee absolute security.</p>
    <p>We retain your personal data for as long as your account is active or as needed to provide you with our Services. We may also retain information to comply with our legal obligations, resolve disputes, and enforce our agreements.</p>
    
    <hr/>

    <h2>5. Our Commitment to Protecting Minors</h2>
    <p>Our platform is designed for secondary school students. We are fully compliant with Nigerian data protection laws regarding minors. We encourage parents and guardians to be involved in their children's online activities. If you are a parent or guardian and believe we have collected information from your child without appropriate consent, please contact us immediately so we can take corrective action.</p>

    <hr/>

    <h2>6. Your Data Protection Rights</h2>
    <p>In accordance with the Nigeria Data Protection Regulation (NDPR) and other applicable laws, you have the following rights regarding your personal data:</p>
    <ul>
      <li><strong>The Right to Access:</strong> You can request a copy of the personal information we hold about you.</li>
      <li><strong>The Right to Rectification:</strong> You can request that we correct any inaccurate or incomplete information.</li>
      <li><strong>The Right to Erasure:</strong> You can request that we delete your personal data, subject to certain legal conditions.</li>
      <li><strong>The Right to Restrict Processing:</strong> You can request that we limit the processing of your personal data.</li>
    </ul>
    <p>To exercise any of these rights, please contact us using the details below.</p>

    <hr/>

    <h2>7. Changes to This Privacy Policy</h2>
    <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date. We encourage you to review this policy periodically.</p>

    <hr/>

    <h2>8. Contact Us</h2>
    <p>If you have any questions, concerns, or complaints about this Privacy Policy or our data practices, please do not hesitate to contact us:</p>
    <p><strong>Email:</strong> <a href="mailto:privacy@brainer.com.ng"><strong>privacy@brainer.com.ng</strong></a></p>
  </div>
);

export default PrivacyPolicyPage;