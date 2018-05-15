#out dependencies
import numpy as np

class MiniBatchOptimizer:
    def __init__(self, X, y, tolerance, learning_rate, batch_size, ):
        self.learning_rate = learning_rate
        self.tolerance = tolerance
        self.X = X
        self.y = y
        self.number_of_points, self.number_of_variables = X.shape
        self.number_of_variables -= 1 #we subtract the extra bias term
        self.batch_size = batch_size
        
    def optimize(self):
        self.theta = np.array([np.random.randint(1, 100000) for _ in range(self.number_of_variables + 1)]) #we choose a random value for theta
        self.theta = np.resize(self.theta, new_shape=(self.number_of_variables + 1, 1))
        prev_value = 1
        current_value = 2
        while abs(prev_value - current_value) >= self.tolerance:
            gradient = 0
            for i in range(0, number_of_points + 1, self.batch_size):
                mini_batch = X[i : i + self.batch_size, :]
                gradient += self.learning_rate * np.matmul(np.transpose(mini_batch), np.subtract(np.matmul(mini_batch, self.theta), self.y[i : i + self.batch_size]))
            self.theta = self.theta - gradient
            prev_value = current_value
            current_value = np.sum(np.square(np.matmul(self.X, self.theta) - self.y))
        return self.theta