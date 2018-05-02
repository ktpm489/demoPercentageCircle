import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, View, ViewPropTypes, I18nManager} from 'react-native'
// default proptypes
const ViewPropTypesStyle = ViewPropTypes ? ViewPropTypes.style : View.propTypes.style

function percentToDegrees(percent){
  return percent*3.6
}

export class PercentageCircle extends Component {
  static propTypes = {
    color : PropTypes.string,
    shadowColor: PropTypes.string,
    bgColor : PropTypes.string,
    radius : PropTypes.number.isRequired,
    borderWidth: PropTypes.number,
    percent : PropTypes.number,
    children : PropTypes.node,
    containerStyle : ViewPropTypesStyle
  }
  static defaultProps = {
    color : '#f00',
    shadowColor :'#999',
    bgColor : '#e9e9ef',
    borderWidth :2,
    children : null,
    containerStyle : null
  }

  constructor(props){
    super(props)
    this.state = this.getInitialStateFromProps(props)
  }
  componentWillReceiveProps(nextProps){
    this.setState(this.getInitialStateFromProps(nextProps))
  }
  getInitialStateFromProps(props){
    const percent = Math.max(Math.min(100, props.percent), 0)
    const needHalfCircle2 = percent > 50
    let halfCircle1Degree
    let halfCircle2Degree
    if (needHalfCircle2){
      halfCircle1Degree = 180
      halfCircle2Degree = percentToDegrees(percent)
    } else {
      halfCircle1Degree = percentToDegrees(percent)
      halfCircle2Degree = 0
    }

    return {
      halfCircle1Degree,
      halfCircle2Degree,
      halfCircle2Styles: {
        // when the second half circle is not needed ,we need to use default outer circle color
        backgroundColor : needHalfCircle2 ? props.color : props.shadowColor
      }
    }
  }
  renderHalfCircle(rorateDegree, halfCirlceStyles) {
    const { radius, color } = this.props
    return (
      <View style={[
        styles.leftWrap,
        {
          width : radius,
          height : radius*2
        }
      ]}>
      <View
        style={[
          styles.halfCircle,
          {
            width : radius,
            height : radius*2,
            borderRadius : radius,
            transform : [
              { translateX : radius/2 },
              { rotate : `${rorateDegree}deg`},
              {translateX : -radius/2}
            ],
            backgroundColor : color,
            ...halfCirlceStyles
          }
        ]}
      />
      </View>
    )
  }
  renderInnerCircle(){
    const radiusMinus = this.props.radius- this.props.borderWidth
    return (
      <View
      style={[
        styles.innerCircle,
        {
          width: radiusMinus *2,
          height : radiusMinus *2,
          borderRadius : radiusMinus,
          backgroundColor : this.props.bgColor,
          ...this.props.containerStyle
        }
      ]}>
        {this.props.children}
      </View>
    )
  }
  render() {
    const {
      halfCircle1Degree,
      halfCircle2Degree,
      halfCircle2Styles     
    } = this.state
    return (
      <View
       style={[
         styles.outerCircle,
         {
           width : this.props.radius*2,
           height : this.props.radius*2,
           borderRadius : this.props.radius,
           backgroundColor : this.props.shadowColor
         }
       ]}>
        {this.renderHalfCircle(halfCircle1Degree)}
        {this.renderHalfCircle(halfCircle2Degree, halfCircle2Styles)}
        {this.renderInnerCircle()}
      </View>
    )
  }
}

let direction = I18nManager.isRTL ? 'right' : 'left'
const styles = StyleSheet.create({
  outerCircle : {
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  innerCircle : {
    overflow: 'hidden',
    justifyContent : 'center',
    alignItems: 'center',
  },
  leftWrap : {
    position : 'absolute',
    top : 0,
    [`${direction}`] : 0 ,
  },
  halfCircle : {
    position : 'absolute',
    top : 0,
    left: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  }
})


export default PercentageCircle;
