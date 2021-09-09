import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';

const PageContainer = styled.div`
  max-width: 1264px;
  margin: 0 auto;
  display: flex;
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
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  margin-left: -1px;
`;

const QuestionHeader = styled.div`
  margin-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 16px;

  h1 {
    font-size: 27px;
    margin-bottom: 8px;
    color: #3b4045;
  }

  .meta {
    font-size: 13px;
    color: #6a737c;
    span { color: #232629; margin-right: 15px; }
  }
`;

const PostLayout = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 16px;
  margin-bottom: 30px;
`;

const VoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  button {
    background: none;
    border: none;
    cursor: pointer;
    svg { width: 36px; height: 36px; fill: #babfc4; }
    
    &:hover svg { fill: ${({ theme }) => theme.colors.primary}; }
  }

  span { font-size: 21px; color: #6a737c; font-weight: 500; }
`;

const PostContent = styled.div`
  font-size: 15px;
  color: #232629;
  
  .tags { margin-top: 24px; display: flex; gap: 4px; }
`;

const Tag = styled.span`
  background: #e1ecf4;
  color: #39739d;
  padding: 4px 6px;
  border-radius: 3px;
  font-size: 12px;
`;

const AnswerSection = styled.div`
  margin-top: 30px;
  h2 { font-size: 19px; margin-bottom: 16px; font-weight: 400; border-bottom: 1px solid ${({ theme }) => theme.colors.border}; padding-bottom: 10px; }
`;

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    // Mock data
    setQuestion({
      _id: id,
      title: 'How to use Styled Components with React 17?',
      content: 'I am trying to implement a theme provider but keep getting errors regarding version mismatch. Here is my code: ...',
      tags: ['react', 'styled-components'],
      upvotes: 15,
      createdAt: '2021-09-02',
      author: { name: 'John Doe' },
      answers: [
        { _id: 'a1', content: 'You need to ensure you are using the legacy peer deps flag during installation.', upvotes: 10, author: { name: 'Jane Smith' } }
      ]
    });
  }, [id]);

  if (!question) return <div>Loading...</div>;

  return (
    <PageContainer>
      <Sidebar>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="/public">PUBLIC</a></li>
            <li style={{ paddingLeft: '20px' }}><Link to="/" className="active">Questions</Link></li>
          </ul>
        </nav>
      </Sidebar>
      <MainContent>
        <QuestionHeader>
          <h1>{question.title}</h1>
          <div className="meta">
            Asked <span>{question.createdAt}</span>
            Modified <span>today</span>
            Viewed <span>120 times</span>
          </div>
        </QuestionHeader>

        <PostLayout>
          <VoteContainer>
            <button><svg viewBox="0 0 36 36"><path d="M2 26h32L18 10 2 26z"></path></svg></button>
            <span>{question.upvotes}</span>
            <button><svg viewBox="0 0 36 36"><path d="M2 10h32L18 26 2 10z"></path></svg></button>
          </VoteContainer>
          <PostContent>
            <p>{question.content}</p>
            <div className="tags">
              {question.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
            </div>
          </PostContent>
        </PostLayout>

        <AnswerSection>
          <h2>{question.answers.length} Answer</h2>
          {question.answers.map(ans => (
            <PostLayout key={ans._id}>
              <VoteContainer>
                <button><svg viewBox="0 0 36 36"><path d="M2 26h32L18 10 2 26z"></path></svg></button>
                <span>{ans.upvotes}</span>
                <button><svg viewBox="0 0 36 36"><path d="M2 10h32L18 26 2 10z"></path></svg></button>
              </VoteContainer>
              <PostContent>
                <p>{ans.content}</p>
                <div style={{ textAlign: 'right', fontSize: '12px', color: '#0077cc', marginTop: '10px' }}>
                  answered by {ans.author.name}
                </div>
              </PostContent>
            </PostLayout>
          ))}
        </AnswerSection>
      </MainContent>
    </PageContainer>
  );
};

export default QuestionDetail;
