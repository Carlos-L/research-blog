#### 1. 北邮点对多点网络

[Point-to-multipoint network for continuous-variable quantum key distribution with passive-state preparation | Phys. Rev. Applied](https://journals.aps.org/prapplied/abstract/10.1103/8ydq-t8ht)

作者：[Jiale Mi](https://journals.aps.org/search/field/author/Jiale%20Mi)[](https://orcid.org/0009-0005-6560-4117), [Yiming Bian](https://journals.aps.org/search/field/author/Yiming%20Bian)[](https://orcid.org/0000-0001-5331-1871)*, [Song Yu](https://journals.aps.org/search/field/author/Song%20Yu)[](https://orcid.org/0000-0003-1489-9021), and [Yichen Zhang](https://journals.aps.org/search/field/author/Yichen%20Zhang)†(https://ror.org/04w9fbh59

课题组：
- 喻松 [喻松 教授 博士、硕士生导师-北京邮电大学电子工程学院](https://see.bupt.edu.cn/info/1049/2136.htm)现任北京邮电大学电子工程学院、信息光子学与光通信国家重点实验室教授，博士、硕士生导师。2005年毕业于北京邮电大学电磁场与微波技术专业，获工学博士学位，2013年起任北京邮电大学教授。现为国际无线电科学联盟（URSI）电子学和光子学分会委员，量子密码专业委员会委员等。入选2009年度教育部新世纪优秀人才支持计划。主要从事量子密码、高精度时频基准传递的研究，取得多项自主创新成果。以自主化的核心元器件，研制了实用化的连续变量量子密钥分发系统，在中国移动商用光纤通信系统中达到80km的传输距离，远超之前17.7km的世界记录，为实用化量子密码做出了重要贡献。在实验室基于低损耗光纤实现了202.81km传输距离的连续变量量子量子密钥分发，为世界最远传输距离。研制的高精度光纤时频传递系统，达到了数千公里的传输距离，可支持更高精度的导航定位。研究成果在国内知名企业开始应用。
- ![[Pasted image 20260820124406.png]]
- 张一辰 [张一辰 副教授 博士、硕士生导师-北京邮电大学电子工程学院](https://see.bupt.edu.cn/info/1051/2195.htm)副教授，博士、硕士生导师，APS、OSA、SPIE会员，中国通信学会、中国密码学会会员。2017年获得北京邮电大学工学博士学位，2020完成博士后研究，并于2020年7月被聘为特聘副研究员。先后主持和参加国家863计划、国家重点研发计划、国家自然科学基金等多项国家级项目，以及企业横向合作项目10余项；近5年在Nat. Photonics、Phys. Rev. Lett.、Quantum Sci. Technol.、Phys. Rev. Appl.等期刊上发表SCI检索论文40余篇（包括1篇ESI高被引），其中第一作者（含通讯作者）发表SCI检索论文20余篇，论文引用次数超过700次；目前担任DRCN国际会议TPC 成员，受邀担任Nat. Photonics、Nat. Commun.、Phys. Rev. Lett.、Optica等10余个国际著名期刊的审稿人。
- ![[Pasted image 20260820124645.png]]

核心思想： Alice 发送 Bob1、Bob2、Bob3......接受

对于每个Bob: Xbi = kiXa+N
把“除目标 Bob 外的所有接收者”整体并入 Eve，并针对每条链路单独做纠错和隐私放大

```
Alice的热变量 XA
   ├── Bob1得到 Y1 = 相关部分 + 独立噪声 Z1
   ├── Bob2得到 Y2 = 相关部分 + 独立噪声 Z2
   └── BobN得到 YN = 相关部分 + 独立噪声 ZN
```

Alice 分别估计 \(Y_1,Y_2,\ldots,Y_N\)。由于每条支路的真空噪声、信道噪声和探测噪声不同，各 Bob 的反向协调比特串也不同。这正是 PTMP-CVQKD 能从一次广播中产生多条不同密钥的物理基础。相同思想也见于此前的主动相干态 CV-QPON：独立密钥来自各接收端经历的独立量子噪声和反向协调。[CV-QPON 原论文](https://www.nature.com/articles/s41377-024-01633-9)

不过，**独立噪声只提供原始差异，不足以单独证明保密性**。真正的保证来自后面三层。
1. 安全证明显式计算其他 Bob 的旁信息
2. 每条链路独立反向协调，校验信息不能裸发
3. 每个用户单独隐私放大

![[Pasted image 20260820131056.png]]

理论文章 没有真的做实验

个人评价：实验架构（组网架构）平平无奇，但是理论挺牛逼的

#### 2.山西大学

[High-Performance Fully Passive Discrete-State Continuous-Variable Quantum Key Distribution with Local Local Oscillator | Phys. Rev. Lett.](https://journals.aps.org/prl/abstract/10.1103/wgqv-cvr9)

 作者课题组：**李永民，男，1977年1月生，理学博士，量子光学与光量子器件国家重点实验室、山西大学光电研究所教授，博士生导师，山西省三晋英才拔尖骨干人才、山西省中青年拔尖创新人才、山西省校优秀青年学术带头人。主要研究方向：量子光学、量子信息。**

  2003年毕业于山西大学光电研究所，获理学博士学位。2003-2005年在日本东京大学从事博士后研究，主要研究方向为多光子量子态的制备及其在量子信息领域的应用。2008年访问澳大利亚国立大学，合作进行固态介质量子信息存储的研究。2005年至今在山西大学量子光学与光量子器件国家重点实验室工作，主要从事量子通信、量子光力等方面的理论与实验研究。

![[Pasted image 20260820153152.png]]

直调激光器获得相位随机化
双偏振体系
ML为了随机，SL为了使得脉冲更加稳定
时分+频分

系统重复频率 1GHz
探测器带宽 5Ghz
示波器采样率 50Gsa/s

Vel = 0.189 SNU
etection efficiency: η = 0.352
探测器比较拉

![[Pasted image 20260821170423.png]]

#### 3. 上交自由空间

[High-Rate Free-Space Continuous-Variable QKD with Self-Referenced Passive State Preparation](https://arxiv.org/pdf/2604.27299)

| 参数                 | 数值             |
| ------------------ | -------------- |
| ASE带通滤波中心          | 1550.12 nm     |
| ASE光学滤波宽度          | 0.4 nm，约50 GHz |
| Alice ICR带宽        | 20 GHz         |
| Bob ICR带宽          | 20 GHz         |
| 示波器采样率             | 40 GSa/s       |
| 等效符号/重复频率 \(F_m\)  | 20 GHz         |
| Laser 1波长          | 1550.12 nm     |
| Laser 1线宽          | 小于100 Hz       |
| Laser 2波长          | 1550.13 nm     |
| 实测拍频               | 约1.1 GHz       |
| Alice ASE分束        | 99%本地测量、1%发送   |
| 发送衰减透过率 \(\eta_0\) | 0.0299         |
| Alice/Bob探测效率      | 0.56           |
| Alice电子噪声          | 0.34 SNU       |
| Bob电子噪声            | 0.38 SNU       |
| 调制方差               | 约2.97–3 SNU    |
| 协调效率 \(\beta\)     | 0.96           |
| 帧错误率FER            | 0.30           |
| 信道损耗范围             | 约16–23.5 dB    |
| 最大测试损耗             | 23.5 dB        |
论文把总过量噪声写为：
$$
\varepsilon=
\varepsilon_{\rm PSP}
+\varepsilon_{\rm freq}
+\varepsilon_{\rm phase}
+\varepsilon_{\rm chan}
+\varepsilon_{\rm fad}
+O(\varepsilon_{\rm mode}).
$$
分别对应：
- $\varepsilon_{\rm PSP}$：Alice被动测量不能完美预测发送态；
- $\varepsilon_{\rm freq}$：两台激光器频偏估计误差；
- $\varepsilon_{\rm phase}$：信标相位估计误差；
- $\varepsilon_{\rm chan}$：一般信道噪声；
- $\varepsilon_{\rm fad}$：自由空间透过率波动；
- $\varepsilon_{\rm mode}$：Alice与Bob接收时间模式不匹配。

论文报告在固定23.5 dB左右信道下：
$$
V_A\approx2.973\ {\rm SNU},
$$
$$
\varepsilon\approx0.0393\ {\rm SNU}.
$$
其PSP噪声平均约：
$$
\varepsilon_{\rm PSP}\approx0.0014\ {\rm SNU},
$$
说明主要噪声并非来自被动态制备本身，而更多来自频相恢复、电子噪声、信道以及接收模式匹配。

 $\varepsilon_{\rm fad}$ 只存在于自由空间信道中，光纤中这一项可以忽略
![[Pasted image 20260821211912.png]]

![[Pasted image 20260821212755.png]]
![[Pasted image 20260821212823.png]]
和我的实验架构的单根窄线宽梳齿光的方案是一致的

没有集成，只有一个ICR（Integrated coherent receiver）

个人评价：有点牛逼，但不多
这篇文章是延续25年[All-day free-space quantum key distribution with thermal source towards quantum secure communications for unmanned vehicles | npj Quantum Information](https://www.nature.com/articles/s41534-025-01085-y)

