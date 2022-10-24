import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  grid-area: cat;
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  width: 80%;
  height: 200px;
  align-items: center;
  box-shadow: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px,
    rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px,
    rgba(240, 46, 170, 0.05) 25px 25px;
  border-radius: 1rem;
`;

const Search = styled.form`
  position: relative;
  display: flex;
  align-items: center;

  input {
    width: 18rem;
    height: 4rem;
    border: none;
    border-radius: 1rem;
    font-size: 1.4rem;
    padding-left: 3.8rem;
    box-shadow: inset 2rem 2rem 5rem var(--greyLight-2),
      inset -2rem -2rem 5rem var(--white);
    background: none;
    font-family: inherit;
    color: var(--greyDark);

    &::placeholder {
      color: var(--greyLight-3);
    }
    &:focus {
      outline: none;
      box-shadow: 3rem 3rem 6rem var(--greyLight-2),
        -2rem -2rem 5rem var(--white);

      .search_icon {
        color: var(--primary);
      }
    }
  }
`;

const Button = styled.button`
  margin-top: 10px;
  width: 10rem;
  height: 2rem;
  border: none;
  border-radius: 1rem;
  box-shadow: inset 2rem 2rem 5rem var(--greyLight-2),
    inset -2rem -2rem 5rem var(--white);
  justify-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 3s ease;
  color: var(--greyDark);
  :hover {
    color: var(--primary);
  }
  :active {
    box-shadow: 3rem 3rem 6rem var(--greyLight-2), -2rem -2rem 5rem var(--white);
  }
`;

const CategoryCheckBox = styled.div`
  height: 70px;
  display: flex;
  justify-content: center;

  .checkbox_0 label:hover i,
  .checkbox_1 label:hover i,
  .checkbox_2 label:hover i,
  .checkbox_3 label:hover i,
  .checkbox_4 label:hover i,
  .checkbox_5 label:hover i,
  .checkbox_6 label:hover i,
  .checkbox_7 label:hover i,
  .checkbox_8 label:hover i {
    color: var(--primary);
  }

  .checkbox_ {
  }
  label i {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--greyDark);
    transition: 0.3s ease;
  }

  .checkbox_ input:checked ~ label {
    box-shadow: inset 0.2rem 0.2rem 0.5rem var(--greyLight-2),
      inset -0.2rem -0.2rem 0.5rem var(--white);
  }

  .checkbox__ input:checked ~ label i {
    color: var(--primary);
  }
`;

const Category = () => {
  const techstacks = [
    'Back-end',
    'Front-end',
    'HTML',
    'CSS',
    'JavaScript',
    'JAVA',
    'Spring',
    'React',
    'Node.js',
  ];
  return (
    <Container>
      <Search>
        <input placeholder="Search...." />
        <Button>검색</Button>
      </Search>
      <CategoryCheckBox>
        {techstacks.map((tech) => (
          <div className={`checkbox_${tech}`} key={tech}>
            <input id={`checkbox-${tech}`} type={'checkbox'} />
            <label htmlFor={`checkbox-${tech}`}>
              <i>{tech}</i>
            </label>
          </div>
        ))}
      </CategoryCheckBox>
    </Container>
  );
};

export default Category;
