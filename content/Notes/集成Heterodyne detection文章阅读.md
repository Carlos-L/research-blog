
### High-performance heterodyne receiver for quantum information processing in a laser-written integrated photonic platform

[High-performance heterodyne receiver for quantum information processing in a laser-written integrated photonic platform](https://www.spiedigitallibrary.org/journals/advanced-photonics/volume-8/issue-1/016009/High-performance-heterodyne-receiver-for-quantum-information-processing-in-a/10.1117/1.AP.8.1.016009.full)

作者：[Andrea Peri](https://www.spiedigitallibrary.org/profile/notfound?author=Andrea_Peri), [Giulio Gualandi](https://www.spiedigitallibrary.org/profile/notfound?author=Giulio_Gualandi), [Tommaso Bertapelle](https://www.spiedigitallibrary.org/profile/Tommaso.Bertapelle-4318820), [Mattia Sabatini](https://www.spiedigitallibrary.org/profile/notfound?author=Mattia_Sabatini), [Giacomo Corrielli](https://www.spiedigitallibrary.org/profile/notfound?author=Giacomo_Corrielli), [Yoann Piétri](https://www.spiedigitallibrary.org/profile/Yoann.Pi%C3%A9tri-5448593), [Davide Giacomo Marangon](https://www.spiedigitallibrary.org/profile/notfound?author=Davide_Giacomo_Marangon), [Giuseppe Vallone](https://www.spiedigitallibrary.org/profile/notfound?author=Giuseppe_Vallone), [Paolo Villoresi](https://www.spiedigitallibrary.org/profile/notfound?author=Paolo_Villoresi), [Roberto Osellame](https://www.spiedigitallibrary.org/profile/Roberto.Osellame-20513), [Marco Avesani](https://www.spiedigitallibrary.org/profile/notfound?author=Marco_Avesani)

单位：Univ. degli Studi di Padova (Italy) 意大利帕多瓦大学

我们提出在硼硅酸盐玻璃上采用飞秒激光微加工（FLM）技术，作为制造光子集成电路（PIC）的平台，以实现适用于量子信息处理的相干检测。

该 PIC 配备了完全可调的光学元件，可在协议定义的条件下实现精确校准和可靠运行。该器件具有低插入损耗（≤1.28 dB）、偏振不敏感特性，以及超过 73 dB 的共模抑制比。

凭借这些特性，我们成功实现了源-器件无关的CV-QRNG，其安全生成速率达42.74 Gbit/s；同时，基于正交相移键控（QPSK）的CV-QKD系统实现了3.2 Mbit/s的密钥速率。我们的研究成果凸显了FLM技术作为集成光子平台的潜力，为可扩展且高性能的量子通信系统铺平了道路。

Background： 
SiN很难做有源区，必须外界PD
Si硅光技术SOI可以做有源区，但是很难集成光源，且偏振敏感
InP可以做激光器、有源区，但是也偏振敏感

该技术能够实现偏振不敏感器件：注入芯片的任何偏振态都会经历相同的酉变换，因为方向耦合器对任何偏振态都采用相同的分光比，且微弱的残余双折射（10−6 至 10−5，主要源于芯形各向异性）会在所有路径上引起相同的旋转。这种固有的偏振不敏感性使得多个器件能够进行模块化互连，而无需精确的偏振控制，这与其他集成平台形成了鲜明对比。

![[Pasted image 20260726012357.png]]![[Pasted image 20260726012520.png]]

相比于其他工作最大优势：
1. 制作工艺新颖 FLM飞秒激光加工
2. 低片上损耗 低插入损耗
3. 偏振不敏感

![[Pasted image 20260731012409.png]]

并且用此套接收端完成了CVQKD和QRNG

![[Pasted image 20260731012528.png]]

![[Pasted image 20260731012826.png]]