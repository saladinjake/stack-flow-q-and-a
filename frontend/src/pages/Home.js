import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
    
    &.active {
      background: #f1f2f3;
      border-right: 3px solid ${({ theme }) => theme.colors.primary};
      font-weight: bold;
      color: ${({ theme }) => theme.colors.text};
    }
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 24px;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  margin-left: -1px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h1 {
    font-size: 27px;
    font-weight: 400;
  }
`;

const AskButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  padding: 10px 12px;
  border-radius: 3px;
  font-size: 13px;
  font-weight: 500;
  
  &:hover {
    background-color: #0063ad;
    color: white;
  }
`;

const QuestionItem = styled.div`
  padding: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  gap: 16px;

  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  width: 60px;
  font-size: 13px;
  color: #6a737c;

  span.bold {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 500;
  }
`;

const Content = styled.div`
  flex: 1;

  h3 {
    font-size: 17px;
    font-weight: 400;
    margin-bottom: 4px;
  }

  p {
    font-size: 13px;
    color: #3c4146;
    margin-bottom: 8px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const TagList = styled.div`
  display: flex;
  gap: 4px;
`;

const Tag = styled.span`
  background: #e1ecf4;
  color: #39739d;
  padding: 4px 6px;
  border-radius: 3px;
  font-size: 12px;
  
  &:hover {
    background: #d0e3f1;
  }
`;

const Home = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <PageContainer>
      <Sidebar>
        <nav>
          <ul>
            <li><a href="/" className="active">Home</a></li>
            <li><a href="/public">PUBLIC</a></li>
            <li style={{ paddingLeft: '20px' }}><a href="/questions">Questions</a></li>
            <li style={{ paddingLeft: '20px' }}><a href="/tags">Tags</a></li>
            <li style={{ paddingLeft: '20px' }}><a href="/users">Users</a></li>
          </ul>
        </nav>
      </Sidebar>
      <MainContent>
        <Header>
          <h1>Top Questions</h1>
          <AskButton to="/ask">Ask Question</AskButton>
        </Header>
        
        {questions.map(q => (
          <QuestionItem key={q._id}>
            <Stats>
              <div><span className="bold">{q.upvotes}</span> votes</div>
              <div style={{ border: '1px solid #5eba7d', color: '#5eba7d', padding: '2px 4px', borderRadius: '3px' }}>
                <span className="bold">{q.answers}</span> answers
              </div>
              <div>{q.views} views</div>
            </Stats>
            <Content>
              <Link to={`/questions/${q._id}`}><h3>{q.title}</h3></Link>
              <p>{q.content}</p>
              <TagList>
                {q.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
              </TagList>
            </Content>
          </QuestionItem>
        ))}
      </MainContent>
    </PageContainer>
  );
};

export default Home;
