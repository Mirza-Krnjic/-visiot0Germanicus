import PropTypes from "prop-types"
import Styled from "styled-components"

const Container = Styled.div`
  progress {
    margin: 15px auto;
    margin-bottom: 30px;
    padding-top: 6px;
  }

  progress[value] {
    width: ${(props) => props.width};

    -webkit-appearance: none;
    appearance: none;
  }

  progress[value]::-webkit-progress-bar {
    height: 15px;
    border-radius: 20px;
    background-color: #eee;
  }  

  progress[value]::-webkit-progress-value {
    height: 15px;
    border-radius: 20px;
    background-color: ${(props) => props.color};
  }
`

const ProgressBar = ({ value, max, color, width }) => {
  return (
    <Container color={color} width={width}>
      <progress value={value} max={max} />
      {/* <span>{(value / max) * 100}%</span> */}
    </Container>
  )
}

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
  color: PropTypes.string,
  width: PropTypes.string,
}

ProgressBar.defaultProps = {
  max: 100,
  color: "rgb(251,33,117)",
  width: "250px",
}

export default ProgressBar
