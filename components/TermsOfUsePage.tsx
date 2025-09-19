import React from 'react';

const TermsOfUsePage: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-xl shadow-lg max-w-4xl mx-auto prose lg:prose-lg dark:prose-invert">
    <h1 className="text-center">Terms and Conditions of Use</h1>
    <p className="text-center text-sm text-gray-500">
      <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
    </p>

    <p className="lead">
      Welcome to Brainer! These Terms and Conditions ("Terms") govern your access to and use of the Brainer website, platform, competitions, courses, and all related services (collectively, the "Services"). By creating an account or using our Services, you agree to be legally bound by these Terms.
    </p>

    <hr/>

    <h2>1. Acceptance of Terms</h2>
    <p>
      Please read these Terms carefully. If you do not agree with any part of these Terms, you must not use our Services. Your continued use of the Services constitutes your formal acceptance of these Terms and any updates thereto.
    </p>

    <hr/>

    <h2>2. User Eligibility and Account Security</h2>
    <p>
      Our Services are intended for use by secondary school students in Nigeria. By creating an account, you represent and warrant that you meet this eligibility requirement.
    </p>
    <ul>
      <li><strong>Account Information:</strong> You agree to provide true, accurate, current, and complete information during the registration process.</li>
      <li><strong>Account Security:</strong> You are solely responsible for maintaining the confidentiality of your account password and for all activities that occur under your account. You must notify us immediately of any unauthorized use or security breach.</li>
    </ul>

    <hr/>

    <h2>3. Code of Conduct</h2>
    <p>
      We are dedicated to building a positive, respectful, and collaborative community. As a user of Brainer, you agree to:
    </p>
    <ul>
      <li>Interact with other users, mentors, and staff respectfully and constructively.</li>
      <li>Not engage in any form of harassment, bullying, discrimination, or hate speech.</li>
      <li>Not post or share any content that is illegal, defamatory, obscene, or infringing on the rights of others.</li>
      <li>Not use the Services for any fraudulent or unauthorized purpose.</li>
    </ul>
    <p>
      <em>Violation of this Code of Conduct may result in immediate suspension or termination of your account.</em>
    </p>
    
    <hr/>

    <h2>4. Competition and Course Rules</h2>
    <h3>4.1. General Rules</h3>
    <p>
      Each competition and course on Brainer may have its own specific set of rules, guidelines, and eligibility criteria, which will be provided on the respective event or course page. By participating, you agree to abide by those specific rules in addition to these general Terms.
    </p>
    <h3>4.2. Academic Integrity</h3>
    <p>
      Brainer has a <strong>zero-tolerance policy for academic dishonesty</strong>. Any form of cheating, plagiarism, use of unauthorized aids, or any other action that compromises the fairness and integrity of our competitions is strictly prohibited. Any user found to have violated this policy will be disqualified from the event and may face permanent suspension from the platform.
    </p>

    <hr/>

    <h2>5. Intellectual Property Rights</h2>
    <h3>5.1. Our Content</h3>
    <p>
      All content on the Brainer platform—including text, graphics, logos, course materials, and software—is the exclusive property of Brainer or its licensors and is protected by copyright and other intellectual property laws.
    </p>
    <h3>5.2. Your Content</h3>
    <p>
      You retain full ownership of the intellectual property rights in the content you create and submit for competitions (e.g., essays, projects, code). However, by submitting your work, you grant Brainer a worldwide, non-exclusive, royalty-free license to use, reproduce, display, and distribute your submission for the purposes of administering the competition, promoting our Services, and showcasing exemplary work.
    </p>

    <hr/>

    <h2>6. Privacy</h2>
    <p>
      Your privacy is critically important to us. Our collection, use, and protection of your personal information are governed by our <strong>Privacy Policy</strong>, which is incorporated by reference into these Terms.
    </p>

    <hr/>

    <h2>7. Disclaimers and Limitation of Liability</h2>
    <p>
      THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES, EXPRESS OR IMPLIED. BRAINER DOES NOT GUARANTEE THAT THE SERVICES WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
    </p>
    <p>
      TO THE FULLEST EXTENT PERMITTED BY LAW, BRAINER SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, RESULTING FROM YOUR USE OF THE SERVICES.
    </p>

    <hr/>

    <h2>8. Termination</h2>
    <p>
      We reserve the right to suspend or terminate your account and access to the Services at our sole discretion, without prior notice, if you violate any of these Terms.
    </p>

    <hr/>

    <h2>9. Governing Law and Dispute Resolution</h2>
    <p>
      These Terms shall be governed and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising from or related to these Terms will be resolved through amicable negotiation or, if necessary, in the competent courts of Nigeria.
    </p>

    <hr/>

    <h2>10. Contact Us</h2>
    <p>If you have any questions about these Terms and Conditions, please contact us:</p>
    <p><strong>Email:</strong> <a href="mailto:legal@brainer.com.ng"><strong>legal@brainer.com.ng</strong></a></p>
  </div>
);

export default TermsOfUsePage;