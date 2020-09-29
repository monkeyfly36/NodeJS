// 1.helloworld
// const ret = 'helloworld'
// module.exports = ret

// 2.文件名生成
// const path = require('path')
// module.exports = class TestNow {
//   getTestFileName(fileName) {
//     const dirName = path.dirname(fileName)
//     const baseName = path.basename(fileName)
//     const extName = path.extname(fileName)
//     const testName = baseName.replace(extName, `.spec${extName}`)
//     return path.format({
//       root: dirName + '/__test__/',
//       base: testName
//     })
//   }
// }

// 3.测试代码生成
// module.exports = class TestNow {
//   genTestSource(methodName, classFile, isClass = false) { // classFile代表文件名
//     return `
// test('${'TEST ' + methodName}', () => {
//   const ${isClass ? '{' + methodName + '}' : methodName} = require('../${classFile}')
//   const ret = ${methodName}()
//   expect(ret).toBe('test code')
// })
//   `
//   }
// }

// 4.生成Jest文件
const path = require('path')
const fs = require('fs')
module.exports = class TestNow {
  genJestSource(sourcePath = path.resolve('./')) {
    const testPath = `${sourcePath}/__test__`
    if(!fs.existsSync(testPath)) {
      fs.mkdirSync(testPath)
    }

    // 遍历代码文件
    let list = fs.readdirSync(sourcePath)
    list.map(v => `${sourcePath}/${v}`) // 添加完整路径
        .filter(v => fs.statSync(v).isFile()) // 过滤文件
        .filter(v => v.indexOf('.spec') === -1 ) // 过滤测试文件
        .map(v => this.genTextFile(v))
  }
  genTextFile(fileName) {
    const testFileName = this.getTestFileName(fileName)

    // 判断此文件是否存在
    if(fs.existsSync(testFileName)) {
      console.log('改测试代码已经存在', testFileName)
      return
    }

    const mod = require(fileName)
    let source
    if (typeof mod === 'object') {
      source = Object.keys(mod)
                .map(v => this.genTestSource(v, path.basename(fileName), true))
                .join('\n')
    } else if (typeof mod === 'function') {
      const basename = path.basename(fileName)
      source = this.genTestSource(basename.replace('.js', ''), basename)
    }
    fs.writeFileSync(testFileName, source)
  }

  // 2.文件名生成
  getTestFileName(fileName) {
    const dirName = path.dirname(fileName)
    const baseName = path.basename(fileName)
    const extName = path.extname(fileName)
    const testName = baseName.replace(extName, `.spec${extName}`)
    return path.format({
      root: dirName + '/__test__/',
      base: testName
    })
  }
  // 3.测试代码生成
  genTestSource(methodName, classFile, isClass = false) { // classFile代表文件名
    return `
test('${'TEST ' + methodName}', () => {
  const ${isClass ? '{' + methodName + '}' : methodName} = require('../${classFile}')
  const ret = ${methodName}()
  expect(ret).toBe('test code')
})
  `
  }
}