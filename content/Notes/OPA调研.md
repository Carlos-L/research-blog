
### 1. Free-space Communication Links with Transmitting and Receiving Integrated Optical Phased Arrays

[Free-space Communication Links with Transmitting and Receiving Integrated Optical Phased Arrays](https://opg.optica.org/abstract.cfm?uri=FiO-2018-FTu4E.1)
会议文章
- **Frontiers in Optics / Laser Science**
 - OSA Technical Digest (Optica Publishing Group, 2018),
 - paper FTu4E.1

作者：
Matthew J. Byrd, Christopher V. Poulton, Murshed Khandaker, Erman Timurdogan, Diedrik Vermeulen, and Michael R. Watts

机构：
_Analog Photonics LLC, One Marina Park Drive, Suite 205, Boston, MA, 02210, United States_
看起来像某家公司

硅光芯片上的OPA

点对点实验：OPA - OPA 链路 达到数据传输速率 10GHz，但是是Passive ，传输距离50m，事先对准。

点对多点实验：Active OPA对俩Passive OPA（文中写的是由于仪器限制，可以被轻松替换成两个Active OPA）。两个接收端提前摆好，发射端通过FPGA和DAC驱动phase modulator，去来回对光。

PM响应时间（到稳定下来）~6us     发射端从一个接收端OPA转向另外一个OPA 30us。
![[Pasted image 20260720174406.png]]

总结：这是目前找到的第一个OPA用于通信的工作。插损应该比较大（没有直接提到），因为文中说了在接收端后面接上一个EDFA，所以猜测插损大。

### 2. Lens-Free Chip-to-Chip Free-Space Laser Communication Link with a Silicon Photonics Optical Phased Array

[Lens-Free Chip-to-Chip Free-Space Laser Communication Link with a Silicon Photonics Optical Phased Array](https://opg.optica.org/directpdfaccess/d585f21e-b7fe-4d06-b2470a99bdd3f445_371689/fio-2017-fw5a.3.pdf?da=1&id=371689&uri=FiO-2017-FW5A.3&seq=0&mobile=no)

会议文章：
Frontiers in Optics 2017 © OSA 2017

Christopher V. Poulton, Diedrik Vermeulen, Ehsan Hosseini, Erman Timurdogan, Zhan Su, Benjamin Moss, and Michael R. Watts（和上面同一个组）

OPA性质：
插损-10到-30dB，两个维度可调，（Phase + 波长）

室内OPA - APD

![[Pasted image 20260720181431.png]]

![[Pasted image 20260720181505.png]]
