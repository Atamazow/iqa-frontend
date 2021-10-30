import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const StyledLoading = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  &:after {
    content: ' ';
    display: block;
    margin-top: 7px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 3px solid;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 15px;
  border: none;
  outline: none;
  cursor: pointer;
  line-height: 20px;

  color: ${(props) => props.theme.colors[props.color].main};
  background-color: ${(props) => {
    return props.theme.colors[props.color].addition;
  }};

  // fixme заменить на бордер
  box-shadow: ${(props) => props.theme.colors[props.color].main} 0 0 0 1px inset;

  border-radius: 4px;

  // инверсия цветов для contrast=true
  ${(props) => {
    if (props.contrast) {
      return css`
        color: white;
        background-color: ${(props) => props.theme.colors[props.color].main};
      `;
    }
  }}

  border-radius: ${(props) => (props.rounded ? '24px' : '4px')};

  &[disabled] {
    opacity: 0.5;
  }
  
  & .start-icon {
    display: inherit;
    margin-right: 5px;
    
    & svg {
      height: 20px;
      width: 20px;
    }
  }
`;

export const Button = ({
  children,
  disabled,
  loading,
  startIcon,
  ...props
}) => {
  return (
    <StyledButton {...props} disabled={disabled || loading}>
      {loading ? (
        <>
          {/*fixme неверное отображение иконки (видно в сторибук)*/}
          <StyledLoading /> {children}
        </>
      ) : (
        <>
          {startIcon && <span className="start-icon">{startIcon}</span>}
          {children}
        </>
      )}
    </StyledButton>
  );
};

Button.propTypes = {
  startIcon: PropTypes.element,
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  contrast: PropTypes.bool,
  color: PropTypes.oneOf(['danger', 'gray', 'warning', 'success']),
  rounded: PropTypes.bool,
};

Button.defaultProps = {
  startIcon: null,
  disabled: false,
  loading: false,
  contrast: false,
  rounded: false,
  color: 'success',
};
