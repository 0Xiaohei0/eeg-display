import logging
import sys
import time

import pyqtgraph as pg
from brainflow.board_shim import BoardShim, BrainFlowInputParams, BoardIds
from brainflow.data_filter import DataFilter, FilterTypes, DetrendOperations
from brainflow.ml_model import MLModel, BrainFlowMetrics, BrainFlowClassifiers, BrainFlowModelParams
from pyqtgraph.Qt import QtCore
from PyQt5.QtWidgets import QApplication

from threading import Timer

class RepeatTimer(Timer):  
    def run(self):  
        while not self.finished.wait(self.interval):  
            self.function(*self.args,**self.kwargs)  
            print(' ')  

class Graph:
    def __init__(self):
        print("initializing graph")
        BoardShim.enable_dev_board_logger()
        logging.basicConfig(level=logging.DEBUG)

        params = BrainFlowInputParams()
        params.serial_port = "COM3"
        # board_id = BoardIds.SYNTHETIC_BOARD.value
        params.file = "jawClench.txt"
        params.master_board = BoardIds.CYTON_BOARD

        #board_id = BoardIds.SYNTHETIC_BOARD.value
        board_id = BoardIds.PLAYBACK_FILE_BOARD.value
        self.board_shim = BoardShim(board_id, params)
        self.board_shim.prepare_session()
        self.board_shim.start_stream(450000)
        # self.board_id = self.board_shim.get_board_id()
        self.board_id = 0
        self.eeg_channels = BoardShim.get_eeg_channels(int(self.board_id))
        self.exg_channels = BoardShim.get_exg_channels(self.board_id)
        self.sampling_rate = BoardShim.get_sampling_rate(self.board_id)
        self.update_speed_ms = 50
        self.window_size = 4
        self.num_points = self.window_size * self.sampling_rate

        self.app = QApplication(sys.argv)
        self.win = pg.GraphicsLayoutWidget(title='BrainFlow Plot', size=(800, 600), show=False)
        self._init_timeseries()

        # timer = QtCore.QTimer()
        # timer.timeout.connect(self.update)
        # timer.start(self.update_speed_ms)

        # timer = RepeatTimer(0.05,self.update)  
        # timer.start() #recalling run  
        # print('Threading started') 
        # time.sleep(1)
        # print('Threading finishing')  
        # timer.cancel()
        # self.app.exec()


    def _init_timeseries(self):
        print("initializing board: " , end="")
        print(self.board_shim)
        self.plots = list()
        self.curves = list()
        for i in range(len(self.exg_channels)):
            p = self.win.addPlot(row=i, col=0)
            p.showAxis('left', False)
            # p.setRange(xRange=(0,255), padding=0)
            p.setMenuEnabled('left', False)
            p.showAxis('bottom', False)
            p.setMenuEnabled('bottom', False)
            if i == 0:
                p.setTitle('TimeSeries Plot')
            self.plots.append(p)
            curve = p.plot()
            self.curves.append(curve)

    def update(self):
        
        print("updating board:" , end="")
        print(self.board_shim)
        data = self.board_shim.get_current_board_data(self.num_points)
        bands = DataFilter.get_avg_band_powers(data, self.eeg_channels, self.sampling_rate, True)
        feature_vector = bands[0]
        #print(feature_vector)

        mindfulness_params = BrainFlowModelParams(BrainFlowMetrics.MINDFULNESS.value,
                                                    BrainFlowClassifiers.DEFAULT_CLASSIFIER.value)
        mindfulness = MLModel(mindfulness_params)
        mindfulness.prepare()
        score = mindfulness.predict(feature_vector)
        #print(str(score))
        #print('Mindfulness: %s' % str(mindfulness.predict(feature_vector)))

        for count, channel in enumerate(self.exg_channels):
            # plot timeseries
            DataFilter.detrend(data[channel], DetrendOperations.CONSTANT.value)
            DataFilter.perform_bandpass(data[channel], self.sampling_rate, 3.0, 45.0, 2,
                                        FilterTypes.BUTTERWORTH.value, 0)
            DataFilter.perform_bandstop(data[channel], self.sampling_rate, 48.0, 52.0, 2,
                                        FilterTypes.BUTTERWORTH.value, 0)
            DataFilter.perform_bandstop(data[channel], self.sampling_rate, 58.0, 62.0, 2,
                                        FilterTypes.BUTTERWORTH.value, 0)
            self.curves[count].setData(data[channel].tolist())
            #print(data[0])
        self.data = data
        #self.curves[4].setData(mindfulness.predict(feature_vector).tolist())
        mindfulness.release()
        self.app.processEvents()


def InitializeEEG():
    print("calling main function")
    

    # try:
       
    #     print("initilize graph")
    #     #print(type(graph))
    #     #graph.update()
    # except BaseException:
    #     logging.warning('Exception', exc_info=True)
    # finally:
    #     logging.info('End')
    #     if board_shim.is_prepared():
    #         logging.info('Releasing session')
    #         board_shim.release_session()

if __name__ == '__main__':
   graph = Graph()
   graph.update()