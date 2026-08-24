
[[2607.23413] Highly integrated quantum key distribution transmitter enabled by silicon photonics](https://arxiv.org/abs/2607.23413)

作者：[Rende Liu](https://arxiv.org/search/quant-ph?searchtype=author&query=Liu,+R), [Yan-Lin Tang](https://arxiv.org/search/quant-ph?searchtype=author&query=Tang,+Y), [Cheng-Guang Dong](https://arxiv.org/search/quant-ph?searchtype=author&query=Dong,+C), [Yan Ma](https://arxiv.org/search/quant-ph?searchtype=author&query=Ma,+Y), [Guo-Qing Liu](https://arxiv.org/search/quant-ph?searchtype=author&query=Liu,+G), [Zhi-Lin Xie](https://arxiv.org/search/quant-ph?searchtype=author&query=Xie,+Z), [Shuai Li](https://arxiv.org/search/quant-ph?searchtype=author&query=Li,+S), [Mi Zou](https://arxiv.org/search/quant-ph?searchtype=author&query=Zou,+M), [Hao Liang](https://arxiv.org/search/quant-ph?searchtype=author&query=Liang,+H), [Shi-biao Tang](https://arxiv.org/search/quant-ph?searchtype=author&query=Tang,+S)

Shi-biao Tang: State Key Laboratory of Particle Detection and Electronics University of Science and Technology of China 科大 



QKD 发射端的小型化，不能只停留在“做一个集成光芯片”，而要把光学、电学、随机数、协议处理、认证和热管理一起做成一个真正可独立工作的板级发射机
- 随机数生成；
- BB84 协议执行；
- 同步；
- 身份认证；
- 防木马攻击；
- 调制器驱动；
- 温控和热管理；
- 系统控制与外部通信。
**创新点**
第一，硅光子芯片负责高速量子态制备。  
芯片里集成了量子信号衰减、诱骗态调制、功率平衡和偏振态编码。它用 CDM 做高速调制，用 TOPS 做慢速偏置调谐，最后通过 2D grating coupler 生成偏振编码态。

第二，电学系统高度集成。  
它用一颗 programmable SoC 取代传统分散的 CPU + FPGA 方案，配合 DDR、eMMC、FLASH、OSC、PLL、TRNG、高速驱动器、DAC、secure element 等模块，实现实时协议处理和系统控制。

第三，协议处理在本地完成。  
它把消息认证、基筛选、纠错、错误验证、隐私放大等流程集成在发射端 SoC 中，不再依赖外部电脑离线处理。这一点对“可部署设备”很重要。

第四，实验验证了系统级可行性。  
它搭配传统分立式接收端，在 `51.3 km` 光纤上实现 `219.1 kbps` 安全密钥率，在 `101.8 km` 上实现 `17.9 kbps`。还做了 `12 h` 连续运行稳定性测试。

真正的光电集成，向商用迈进：
![[Pasted image 20260819162037.png]]

接收端：
![[Pasted image 20260819162250.png]]
在每个测量基里，PBS 分出来两路后，它们没有分别接两个探测器，而是：
```
一路直接走
另一路经过 delay line 延迟
然后再合到同一个输出
最后接一个 SPD
```
于是，一个探测器通过“点击时间”就能区分两个结果。
例如 Z 基：
```
H → 不延迟 → 早时间窗点击 → bit 0
V → 延迟   → 晚时间窗点击 → bit 1
```
X 基同理：
```
D → 早时间窗点击 → bit 0
A → 晚时间窗点击 → bit 1
```
所以它把“空间路径区分”转换成了“时间-bin 区分”。
这叫 **time-division multiplexing，TDM，时分复用**。

使用两个pbs+延时线的目的是降低spd的使用数量（4个降低为2个）

下图2是51km处的性能
![[Pasted image 20260819162501.png]]