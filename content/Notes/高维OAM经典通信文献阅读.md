
Hybrid intelligent strategy driving high dimensional encrypted orbital angular momentum comb multicasting towards optical data transmission networks

[Hybrid intelligent strategy driving high-dimensional encrypted orbital angular momentum comb multicasting towards optical data-transmission networks | Light: Science & Applications](https://www.nature.com/articles/s41377-026-02386-3)

作者：- [Shiyun Zhou](https://www.nature.com/articles/s41377-026-02386-3#auth-Shiyun-Zhou-Aff1-Aff2-Aff3), 
- [Lang Li](https://www.nature.com/articles/s41377-026-02386-3#auth-Lang-Li-Aff1-Aff2-Aff3), 
- [Jinyu Yang](https://www.nature.com/articles/s41377-026-02386-3#auth-Jinyu-Yang-Aff1-Aff2-Aff3), 
- [Shurui Zhang](https://www.nature.com/articles/s41377-026-02386-3#auth-Shurui-Zhang-Aff1-Aff2-Aff3), 
- [Zhiyuan Zhou](https://www.nature.com/articles/s41377-026-02386-3#auth-Zhiyuan-Zhou-Aff4-Aff5), 
- [Chunqing Gao](https://www.nature.com/articles/s41377-026-02386-3#auth-Chunqing-Gao-Aff1-Aff3) & 
- [Shiyao Fu](https://www.nature.com/articles/s41377-026-02386-3#auth-Shiyao-Fu-Aff1-Aff2-Aff3-Aff6)
单位：北京理工大学 光电学院
课题组： 
1. 高春清 [Chunqing Gao - 北京理工大学](https://pure.bit.edu.cn/zh/persons/chunqing-gao/)  2002年聘为博士生导师，2005年入选教育部新世纪优秀人才计划，“光学工程”国家一级学科责任教授，光电子研究所所长。新型激光器件与技术，光电子技术与应用、OAM、YAG激光器、光学雷达、半导体激光器
2. 付时尧 [付时尧_北京理工大学光电学院](https://opt.bit.edu.cn/jsdw/jsml111/gxgcxk\(axmpypx\)_0/zgzc_8/f120c24a59bb4d389b32995e5b122a50.htm) 北京理工大学教授、博士生导师，国家级青年人才 激光光场调控技术及应用、新型全固态激光器、激光领域前沿交叉研究、OAM、涡旋矢量光
3. 猜测高春清是付时尧的博士生导师
4. 周志远 [中国科学技术大学 周志远--中文主页--首页](https://faculty.ustc.edu.cn/zhouzhiyuan/zh_CN/index/988025/list/index.htm) 中国科学技术大学副教授 高质量量子光源的制备与应用、中红外光场产生调控与探测以及基于非线性的光学精密测量、通过硅基光子平台研究光场的非线性和调控，主要聚焦于硅基波导在中红外波段的产生与操控


期刊： LSA

**背景/目的**：提升通信容量，需要高维。然而偏振、时间等高维不好做，相比之下OAM的高维优势突出。


Fig. 1 展示了整个系统框架：发送端把不同消息编码成 OAM comb 符号，一张相位全息图同时产生多路 OAM-comb 光束，接收端用 Dammann-vortex grating 对 OAM 模式进行解复用和分析，最后不同接收者恢复各自的信息。
![[Pasted image 20260816155833.png]]


Fig. 2 讲的是混合编码。论文用 `l = -9` 作为 decision node。如果这个模式被激活，就进入 binary encoding，剩下 9 个模式分别表示 9 个 bit；如果这个模式没有被激活，就进入 count-based unary encoding，此时符号只由“有几个 OAM 模式被激活”决定，而不由“具体哪些模式被激活”决定。（有一点点安全性：这种设计带来一种物理层混淆：非授权接收者即使看到多个 OAM 模式存在，也不知道该按照哪种规则解码。）guard state 的想法本身并不新颖，它更像通信中常见的冗余/非法码字检错方法，只是被放进了 OAM comb 编码场景里。
binary信息容量：1024（2^10）
unary信息容量：8
mixed信息容量：512（2^9）
![[Pasted image 20260816111732.png]]

Fig. 3 解释了一张全息图如何同时控制 OAM comb 内容和空间组播方向。AI 分支用 MSUNet 学习如何生成目标 OAM comb 谱；物理分支用标量衍射理论控制不同 diffraction orders。最后两部分相位被融合成一张 phase-only hologram，因此同一个 SLM 图案既控制 OAM 模式结构，也控制不同通道的空间方向。

全息图分成两部分，一部分是生成comb，另一部分是调控衍射（传播方向）;另一部分是在空间上分开，用标量衍射理论
生成Comb：AI（ MSUNet，**multi-scale fusion learning U-shaped neural network**，可以翻译成：**多尺度融合 U 型神经网络**）
调控
MSUNet:
```
我想要一个目标 OAM comb 谱
→ 应该在 SLM 上加载什么 phase-only hologram？
```
目标 OAM comb 是复杂光场，而 SLM 又只能调相位，不能直接调完整复振幅。所以作者用 MSUNet 学习这个非线性映射。输入是目标 OAM comb 的 complex field 信息，输出phase-only hologram φ_OAM
U-Net 是一种编码器-解码器结构：
```
下采样：提取高层特征
上采样：恢复空间分辨率
跳跃连接：保留细节
```
**为什么叫 multi-scale**

因为它不是只在一个尺度上处理特征，而是在多个尺度上融合信息。  
这对 OAM comb 全息图生成很重要，因为：

- 大尺度特征影响整体光场结构；
- 小尺度特征影响局部相位细节；
- 不同 OAM 模式的强度分布和相位结构都要兼顾。

所以 MSUNet 会做多尺度特征融合，用来补偿 phase-only 调制带来的模式强度损失。

**它怎么训练**
```
MSUNet 输出相位图
→ 用衍射传播模型模拟生成光场
→ 分析输出 OAM 谱
→ 和目标 OAM 谱比较
→ 用 RMSE 作为损失反向传播
```

```
目标 OAM comb
→ 得到目标光场/目标 OAM 谱
→ MSUNet 生成 phase-only hologram
→ 用数值衍射模型模拟这张相位图调制后的输出光场
→ 从模拟输出光场中提取 OAM 谱
→ 和目标 OAM 谱比较，计算 RMSE loss
→ 反向传播更新 MSUNet 参数
→ 反复迭代
```
可以把它理解成一种 **physics-in-the-loop training**：
```
神经网络
+ 可微/可计算的光学传播模型
+ OAM 谱分析
+ RMSE 损失
```
训练好以后，使用时就不用再慢慢迭代优化了：
```
输入目标 OAM comb
→ MSUNet 一次前向推理
→ 直接得到 phase-only hologram
```
这就是作者强调它快的原因：训练阶段可以迭代很多次，但实际生成全息图时只需要一次网络推理，论文说大约 `30 ms`。
![[Pasted image 20260816155914.png]]
Fig. 4 展示实验光路和 OAM comb 生成结果。实验使用两个 SLM 和一个 4-f 光学系统。SLM1 负责生成 OAM-comb 组播光束；4-f 系统在傅里叶面把不同衍射级次分开；光阑可以全开用于测量所有 OAM comb，也可以部分关闭用于选择某一路空间通道；SLM2 通过加载共轭螺旋相位来测量 OAM 谱。Fig. 4 的重点是证明 4 路、6 路、8 路 OAM-comb 组播都能被实验生成，并且目标 OAM 谱和测量 OAM 谱比较吻合。

**4-f系统**：


物面/SLM1  -- f --  透镜 L1  -- f --  傅里叶面  -- f --  透镜 L2  -- f --  像面/SLM2

如果两个透镜焦距都是 `f`，整个系统长度约为 `4f`，所以叫 **4-f 系统**。

它的作用可以简单理解为：

1. **第一个透镜 L1 把光场变成空间频谱**  
    不同传播方向、不同空间频率的光，会在中间的傅里叶面上落到不同位置。
    
2. **傅里叶面可以放光阑或滤波器**  
    因为不同衍射级次在这里分开，所以可以选择某一路、挡掉某些空间频率。
    
3. **第二个透镜 L2 再把频谱变回光场**  
    相当于完成反傅里叶变换，把处理后的光重新成像到后面的平面。
    

在这篇论文里，4-f 系统的关键作用是：

```
把 SLM1 生成的不同 diffraction orders 在傅里叶面分开
→ 用光阑选择某个空间通道
→ 再送到 SLM2/CCD 做 OAM 谱分析或解码
```
第一个透镜把传播角度或空间频率映射到傅里叶面的位置，所以不同 diffraction orders 会出现在傅里叶面的不同位置。光阑放在这里，就可以干净地选择某一个空间通道。far-field diffraction 的作用也可以这样理解：它把角度差转化为空间位置差，让接收端能够看到可分辨的衍射光斑阵列

![[Pasted image 20260816155935.png]]
Fig. 5 讲的是六通道图像传输和误码率。混合编码得到很低的 BER，而 pure binary 或 pure unary 解码接近 50% BER。这里不能理解成“混合编码在同等正确解码条件下天然远优于 binary/unary”。更准确地说，发送端使用的是 mixed encoding；如果接收端错误地用 pure binary 或 pure unary 规则去解释这些符号，恢复出的比特就接近随机，因此 BER 接近 50%。所以 Fig. 5 主要展示的是由于编码规则不匹配而带来的物理层安全性，而不是证明 binary 或 unary 本身性能很差。
![[Pasted image 20260816160005.png]]

![[Pasted image 20260816160017.png]]

今天的总体收获是：这篇论文的新意不在 guard state 本身，也不只是用了 AI，而在于把高维 OAM comb 符号、单张相位全息图、多 diffraction order 空间组播，以及 mixed encoding 安全机制整合到一个一对多光通信系统中。