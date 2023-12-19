const crypto = require('crypto')

class EncryptionUtil {
  constructor(key, initVector) {
    this.key = key || '1234567812345678' // Default key
    this.initVector = initVector || '1234567812345678' // Default IV
    this.algo = 'aes-256-cbc'
  }

  encrypt(value) {
    try {
      if (value) {
        const iv = Buffer.from(this.initVector, 'utf8')
        const key = Buffer.from(this.key, 'utf8')
        const cipher = crypto.createCipheriv(this.algo, key, iv)
        let encrypted = cipher.update(value, 'utf8', 'base64')
        encrypted += cipher.final('base64')
        return encrypted
      }
    } catch (ex) {
      console.error(`Exception during encryption with error: ${ex}`)
    }
    return null
  }

  decrypt(encrypted) {
    try {
      if (encrypted) {
        const iv = Buffer.from(this.initVector, 'utf8')
        const key = Buffer.from(this.key, 'utf8')
        const decipher = crypto.createDecipheriv(this.algo, key, iv)
        let decrypted = decipher.update(encrypted, 'base64', 'utf8')
        decrypted += decipher.final('utf8')
        return decrypted
      }
    } catch (ex) {
      console.error(`Exception during decryption with error: ${ex}`)
    }
    return null
  }
}

export default {
  install(Vue, options) {
    const encryptionUtil = new EncryptionUtil(options.key, options.initVector)

    Vue.prototype.$encryptionUtil = encryptionUtil
  },
}
