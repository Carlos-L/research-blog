

### 单篇论文阅读模板

每篇 paper 建议只回答下面 9 个问题。不要一上来逐字读，会被细节淹没。

```markdown

# Paper title


## 1. 这篇解决什么问题？

## 2. 它的系统结构是什么？

- Alice:

- Channel:

- Bob:

- DSP:

- Post-processing:

  

## 3. 关键实验参数

- Modulation:

- Baud rate:

- Distance/loss:

- Detector bandwidth:

- LO scheme:

- Pilot design:

- Block size:

- Excess noise:

- Reconciliation efficiency:

- Final key rate:

  

## 4. 安全假设

- Asymptotic or finite-size:

- Composable or not:

- Collective/coherent attacks:

- Trusted noise:

- Parameter estimation:

  

## 5. 最关键的图

- Fig. ?

- Fig. ?

- Fig. ?

  

## 6. 最关键的公式

- Equation ?

- Equation ?

  

## 7. 对我的课题有什么用？

  

## 8. 我不懂/需要追的点

  

## 9. 可以复现或借鉴的实验/DSP步骤

```

### 1 Long-distance CV-QKD over 100-km fiber with local LO
https://www.science.org/doi/10.1126/sciadv.adi9474?utm_source=chatgpt.com&__cf_chl_f_tk=IjlP5m9ShfuA3ttgR9qpTgko5fLszrk84dt57CmTteo-1783320286-1.0.1.1-0nDHXIu0sKh5d8IWPTK9kYGW8GUaX.HwKtH89mLcnT4

_Science Advances_, 2024

作者：Adnan A. E. Hajomer，......，Tobias Gehring
单位：Center for Macroscopic Quantum States (bigQ), Department of Physics, Technical University of Denmark, 2800 Kongens Lyngby, Denmark.
![[Pasted image 20260706144821.png]]
LLO CVQKD方案，pilot tone用于载波恢复。25kb/s@100km
![[Pasted image 20260706144914.png]]
![[Pasted image 20260706145547.png]]

100 Hz线宽激光器。两个激光器（A和B）频率差大约230MHz。Clearance大约15dB。使用了单边带（single-sideband）调制。在DSP时，先进行了 frequency domain equalizer (whitening filter)。在Pilot处使用1 MHz滤波器，滤出来pilot（比着signal强3个数量级），然后用希尔伯特变换计算相位。频率差用线性拟合得出。系统利用一个已知的、纯净的参考信号（导频），在消除频率偏移后，输入一个基于无迹卡尔曼滤波器（UKF）的机器学习框架，来实现对光信号相位的精准估计和跟踪。在发送时调制使用了root-raised cosine filter， 在后处理时使用了 matched root-raised cosine filter。

补充：
- **无迹卡尔曼滤波器（UKF）**：你可以把它理解为一个**高级的“预测-校正”算法**。它不直接把导频信号拿去算出一个瞬时相位，而是利用导频信号在时间上的连贯性去预测相位变化。
    
    - **预测**：根据上一时刻的相位和速度，预测当前时刻的相位。
        
    - **校正**：将预测的相位与接收到实际导频信号计算出的相位进行比较，然后用一个“最优”的权重去更新预测值。
        
    - **“无迹”**：传统卡尔曼滤波只适用于线性系统，而相位估计是一个非线性问题（三角函数）。UKF用一组精心选择的“采样点”来逼近这个非线性变换，从而在**处理强非线性、非高斯的相位噪声时，比传统的PLL（锁相环）或Viterbi-Viterbi算法更鲁棒、更精确**。


最后慢相位漂移补偿（来源于信号和pilot之间的相位漂移），具体做法
- **已知信息**：Bob手头有两类数据。一类是**接收到的带有相位漂移的参考符号（α）**；另一类是**理论上应该是的标准参考符号（γ）**（这些是收发双方事先约定好的已知数据）。
    
- **核心目标**：Bob需要找到一个最佳的相位旋转量 `θ`，把它乘到接收到的符号 `α` 上，使得旋转后的 `α` 和标准的 `γ` 尽可能“像”。
    
- **“像”的数学度量**：这里用了 **“最大化协方差（maximize the covariance）”**。协方差衡量的是两组数据变化趋势的同步程度。当 `θ` 取到最优值时，`γ` 和 `θα` 的变化趋势会高度一致，协方差达到最大值。
### 2 Gigabit-rate QKD on integrated photonics chips

https://opg.optica.org/optica/fulltext.cfm?uri=optica-13-6-1043
_Optica_, 2026
作者：Si Qi Ng, Florian Kanitschar, Gong Zhang, and Chao Wang
单位：_Centre for Quantum Technologies, National University of Singapore, Singapore, Singapore_；
_Vienna Center for Quantum Science and Technology (VCQ), Atominstitut, Technische Universität Wien, Stadionallee 2, Vienna 1020, Austria_；
_Department of Electrical & Computer Engineering, National University of Singapore, Singapore, Singapore_

硅基片上DM CV QKD
![[Pasted image 20260706154607.png]]
40Gbaud 超高速
以往的带宽限制因素：TIA寄生电容 PCB电容 封装电容

解决方法：在BHD设计中采用了带有串联电阻的低噪声放大器（LNA）

协议过程： 制备->发送->能量检测->接受检测->离散化->纠错->隐私放大

实验中用到的芯片都是由Advanced Micro Foundry Singapore using heir active silicon-on-insulator (SOI) platform.制作

发射端：外腔激光器，50KHz线宽，硅基Vpi 0.5V（-2V偏压下），信号源：M8195A，射频探针链接。