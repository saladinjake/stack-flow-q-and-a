import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

const PageContainer = styled.div`
  max-width: 1264px;
  margin: 0 auto;
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.aside`
  width: 164px;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 24px;
  flex-shrink: 0;
  
  nav ul li a {
    display: block;
    padding: 8px 12px;
    font-size: 13px;
    color: #525960;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 24px;
  background-color: #f8f9f9;
`;

const FormContainer = styled.div`
  max-width: 800px;
  background: white;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
  
  label {
    display: block;
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 4px;
  }
  
  p {
    font-size: 12px;
    color: #3b4045;
    margin-bottom: 8px;
  }
  
  input, textarea {
    width: 100%;
    padding: 8px 10px;
    border: 1px solid #babfc4;
    border-radius: 3px;
    font-size: 13px;
    
    &:focus {
      border-color: #59a4de;
      outline: none;
      box-shadow: 0 0 0 4px rgba(0,119,204,0.15);
    }
  }
  
  textarea {
    min-height: 200px;
    resize: vertical;
  }
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  padding: 10px 12px;
  border: none;
  border-radius: 3px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: #0063ad;
  }
`;

const AskQuestion = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // For now, we use a hardcoded author ID (we'll need to fetch this or seed it)
      // We'll try to find the user we seeded earlier
      const authorId = '69f1c7baa688942bcebad997'; // Seeded Demo User ID
      
      const response = await axios.post('/api/questions', {
        title,
        content,
        tags: tags.split(',').map(t => t.trim()),
        author: authorId 
      });
      
      if (response.data) {
        history.push(`/questions/${response.data._id}`);
      }
    } catch (error) {
      console.error('Error creating question:', error);
      alert('Failed to post question. Make sure backend is running.');
    }
  };

  return (
    <PageContainer>
      <Sidebar>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="/public">PUBLIC</a></li>
            <li style={{ paddingLeft: '20px' }}><Link to="/">Questions</Link></li>
          </ul>
        </nav>
      </Sidebar>
      <MainContent>
        <h1 style={{ fontSize: '27px', marginBottom: '24px', fontWeight: '400' }}>Ask a public question</h1>
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <label>Title</label>
              <p>Be specific and imagine you’re asking a question to another person</p>
              <input 
                type="text" 
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <label>Body</label>
              <p>Include all the information someone would need to answer your question</p>
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <label>Tags</label>
              <p>Add up to 5 tags to describe what your question is about (comma separated)</p>
              <input 
                type="text" 
                placeholder="e.g. (javascript, react, css)" 
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </FormGroup>
            <SubmitButton type="submit">Post your question</SubmitButton>
          </form>
        </FormContainer>
      </MainContent>
    </PageContainer>
  );
};

export default AskQuestion;
