import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>
        
        <div className="prose prose-lg">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-4">
              Welcome to SALT Creative. By accessing or using our service, you agree to be bound by these Terms and Conditions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Definitions</h2>
            <p className="mb-4">
              "Service" refers to the SALT Creative platform.
              "Content" refers to any artwork, images, or designs generated through our service.
              "User" refers to any individual or entity using our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Content Ownership</h2>
            <p className="mb-4">
              Users retain ownership of all Content generated through SALT Creative. However, by using our service, you grant Beanstalk Management LLC a non-exclusive, worldwide, royalty-free license to use, reproduce, and display the Content for promotional purposes and product improvement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Usage Rights</h2>
            <p className="mb-4">
              Users may use the generated Content for their intended purpose, including sermon presentations and church-related materials. Users may not resell or redistribute the Content as a standalone product.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Service Credits</h2>
            <p className="mb-4">
              Our service operates on a credit system. Credits are automatically renewed according to your subscription terms. Unused credits do not roll over to the next period.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Modifications</h2>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Support</h2>
            <p className="mb-4">
              For support inquiries, please contact us at{' '}
              <a 
                href="mailto:salt-support@usebeanstalk.com"
                className="text-primary-600 hover:text-primary-700"
              >
                salt-support@usebeanstalk.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;