// import footerClass from '../../assets/styles/footer.styl'
import '../../assets/styles/footer.styl'

export default {
  data () {
    return {
      author: 'beisir',
      blog: 'hsy7426.com'
    }
  },
  render () {
    return (
    // <div id={footerClass.footer}>
      <div id="footer">
        <span>Power by {this.author}，学习vue_ssr：{this.blog}</span>
        <br/>
        {/* <span>Hosted by Coding Pages</span> */}
      </div>
    )
  }
}
