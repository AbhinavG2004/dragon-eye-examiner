
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartExam = () => {
    setIsLoading(true);
    // Simulate loading before navigating
    setTimeout(() => {
      navigate('/login');
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section */}
      <section className="flex flex-col items-center justify-center px-4 py-24 sm:py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Secure • Reliable • Intelligent
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6">
            Dragon Proctoring System
          </h1>
          <p className="text-xl text-muted-foreground mb-8 mx-auto max-w-2xl">
            The most advanced online exam proctoring solution for educational institutions,
            ensuring academic integrity with cutting-edge monitoring technology.
          </p>
          <button
            onClick={handleStartExam}
            className="btn-primary inline-flex items-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="inline-block w-5 h-5 border-2 border-t-primary-foreground rounded-full animate-spin mr-2"></span>
            ) : null}
            {isLoading ? 'Loading...' : 'Start Exam Session'}
          </button>
        </motion.div>
      </section>

      {/* Features section */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-semibold text-center mb-16"
          >
            Advanced Exam Security Features
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Live Camera Monitoring",
                description: "Real-time video analysis to ensure exam integrity and prevent cheating attempts."
              },
              {
                title: "Secure Authentication",
                description: "Multi-factor authentication ensures only authorized students can access the exam."
              },
              {
                title: "Behavior Analytics",
                description: "Advanced AI detection of suspicious activities during examination sessions."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-xl p-6 h-full"
              >
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-semibold mb-6">Ready to Secure Your Exams?</h2>
            <p className="text-muted-foreground mb-8">
              Start using the Dragon Proctoring System today and ensure academic integrity
              for all your remote examinations.
            </p>
            <button
              onClick={handleStartExam}
              className="btn-primary"
            >
              Begin Proctored Session
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-secondary/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Dragon Proctoring System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
