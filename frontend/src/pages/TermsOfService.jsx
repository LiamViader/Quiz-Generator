import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';
import ResponsiveAppBar from '../components/ResponsiveAppBar';

function TermsOfService() {
  const lastUpdated = "February 6, 2026";

  return (
    <>
      <ResponsiveAppBar pages={[{ name: 'Home', rout: '/' }, { name: 'Public Quizzes', rout: '/publicQuizzes' }]} />
      <Container maxWidth="md" sx={{ marginTop: '3rem', marginBottom: '5rem', color: '#2b2d42' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Terms of Service
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
          Last updated: {lastUpdated}
        </Typography>

        <Divider sx={{ mb: 4 }} />

        {/* 1. Acceptance of Terms */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            1. Acceptance of Terms
          </Typography>
          <Typography variant="body1" paragraph>
            By accessing or using <strong>Quiz Generator</strong>, you agree to be bound by these Terms of Service. This is a personal project provided "as is" for educational and entertainment purposes.
          </Typography>
        </Box>

        {/* 2. AI Content Disclaimer */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            2. AI Content Disclaimer (OpenAI)
          </Typography>
          <Typography variant="body1" paragraph>
            All quizzes are generated using Artificial Intelligence (OpenAI). You acknowledge and agree that:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <li>
              <Typography variant="body1" sx={{ mb: 1 }}>
                AI-generated content may contain <strong>errors, factual inaccuracies, or biases</strong>.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Quiz Generator does not guarantee the accuracy of any question or answer provided by the AI.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Users are encouraged to verify information before using it for educational or professional purposes.
              </Typography>
            </li>
          </Box>
        </Box>

        {/* 3. Usage Limits and Quotas */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            3. Usage Limits and Quotas
          </Typography>
          <Typography variant="body1" paragraph>
            To ensure the sustainability of this service and manage API costs, we enforce strict usage limits:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <li>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Guest Users:</strong> Limited to a shared global daily quota.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Registered Users:</strong> Limited to 5 personal quiz generations per day (subject to change).
              </Typography>
            </li>
          </Box>
          <Typography variant="body1" sx={{ mt: 2 }}>
            We reserve the right to modify, pause, or terminate the service or your access to it at any time without prior notice if quotas are exceeded or for maintenance.
          </Typography>
        </Box>

        {/* 4. Prohibited Conduct */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            4. Prohibited Conduct
          </Typography>
          <Typography variant="body1" paragraph>
            You agree not to use the service to:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <li>Generate content that is illegal, harmful, or promotes hate speech.</li>
            <li>Attempt to bypass usage limits or "jailbreak" the AI prompts.</li>
            <li>Use automated scripts or bots to interact with the service.</li>
          </Box>
        </Box>

        {/* 5. Limitation of Liability */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            5. Limitation of Liability
          </Typography>
          <Typography variant="body1" paragraph>
            In no event shall Quiz Generator or its developer be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the service, even if notified of the possibility of such damage.
          </Typography>
        </Box>

        {/* 6. Contact */}
        <Box sx={{ mt: 6, p: 3, bgcolor: 'rgba(5, 25, 35, 0.03)', borderRadius: '1rem', border: '1px solid rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            6. Questions
          </Typography>
          <Typography variant="body1">
            If you have any questions about these Terms, please contact:
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1, color: '#051923' }}>
            support@liamviader.com
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default TermsOfService;